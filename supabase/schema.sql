-- ============================================================
-- XENIA HOME BUILD - DATABASE SCHEMA
-- Run this in your Supabase SQL Editor to create the tables.
-- Order: create tables → triggers → RLS policies → seed.
-- ============================================================

-- ---------- BUDGET ITEMS ----------
CREATE TABLE IF NOT EXISTS budget_items (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  planned_amount INTEGER NOT NULL DEFAULT 0,
  actual_amount INTEGER,
  vendor TEXT,
  date_quoted DATE,
  date_paid DATE,
  is_included BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_budget_category ON budget_items(category, sort_order);

-- ---------- BUDGET HISTORY (audit log) ----------
CREATE TABLE IF NOT EXISTS budget_history (
  id BIGSERIAL PRIMARY KEY,
  budget_item_id BIGINT REFERENCES budget_items(id) ON DELETE CASCADE,
  item_name TEXT,
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  delta INTEGER,
  change_note TEXT,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_history_item ON budget_history(budget_item_id, changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_history_date ON budget_history(changed_at DESC);

-- ---------- BUDGET SNAPSHOTS (for evolution chart) ----------
CREATE TABLE IF NOT EXISTS budget_snapshots (
  id BIGSERIAL PRIMARY KEY,
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_planned INTEGER,
  total_actual INTEGER,
  total_committed INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_snapshot_date ON budget_snapshots(snapshot_date DESC);

-- ---------- BUDGET SETTINGS ----------
CREATE TABLE IF NOT EXISTS budget_settings (
  id BIGSERIAL PRIMARY KEY,
  target_budget INTEGER NOT NULL DEFAULT 750000,
  contingency_pct NUMERIC(4,3) DEFAULT 0.100,
  loan_costs INTEGER DEFAULT 8000,
  base_price INTEGER DEFAULT 525210,
  elevation_b INTEGER DEFAULT 12000,
  square_feet INTEGER DEFAULT 3031,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------- TIMELINE EVENTS ----------
CREATE TABLE IF NOT EXISTS timeline_events (
  id BIGSERIAL PRIMARY KEY,
  date_label TEXT NOT NULL,
  sort_date DATE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'planned',  -- 'planned' | 'current' | 'done' | 'delayed'
  completed_date DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_timeline_order ON timeline_events(sort_order, sort_date);

-- ---------- DECISIONS ----------
CREATE TABLE IF NOT EXISTS decisions (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  priority TEXT DEFAULT 'med',  -- 'high' | 'med' | 'low'
  status TEXT DEFAULT 'pending',  -- 'pending' | 'in_progress' | 'done'
  decision TEXT,  -- the actual choice made
  notes TEXT,
  decided_date DATE,
  estimated_cost INTEGER,
  actual_cost INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_decisions_category ON decisions(category, priority);

-- ---------- BUILD JOURNAL (notes/log entries) ----------
CREATE TABLE IF NOT EXISTS journal_entries (
  id BIGSERIAL PRIMARY KEY,
  entry_date DATE DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  body TEXT,
  category TEXT,  -- 'meeting', 'quote', 'milestone', 'note'
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_journal_date ON journal_entries(entry_date DESC);

-- ---------- PHOTOS (build progress) ----------
CREATE TABLE IF NOT EXISTS photos (
  id BIGSERIAL PRIMARY KEY,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  caption TEXT,
  taken_date DATE,
  phase TEXT,  -- 'pre-construction', 'foundation', 'framing', etc.
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_photos_phase ON photos(phase, taken_date DESC);


-- ============================================================
-- TRIGGERS - Auto-update timestamps and audit budget changes
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_budget_items_updated ON budget_items;
CREATE TRIGGER trg_budget_items_updated
  BEFORE UPDATE ON budget_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_timeline_updated ON timeline_events;
CREATE TRIGGER trg_timeline_updated
  BEFORE UPDATE ON timeline_events
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_decisions_updated ON decisions;
CREATE TRIGGER trg_decisions_updated
  BEFORE UPDATE ON decisions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Audit budget changes
CREATE OR REPLACE FUNCTION log_budget_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.planned_amount IS DISTINCT FROM NEW.planned_amount THEN
    INSERT INTO budget_history(budget_item_id, item_name, field_name, old_value, new_value, delta)
    VALUES (NEW.id, NEW.name, 'planned_amount',
            COALESCE(OLD.planned_amount::TEXT, 'NULL'),
            COALESCE(NEW.planned_amount::TEXT, 'NULL'),
            COALESCE(NEW.planned_amount, 0) - COALESCE(OLD.planned_amount, 0));
  END IF;
  IF OLD.actual_amount IS DISTINCT FROM NEW.actual_amount THEN
    INSERT INTO budget_history(budget_item_id, item_name, field_name, old_value, new_value, delta)
    VALUES (NEW.id, NEW.name, 'actual_amount',
            COALESCE(OLD.actual_amount::TEXT, 'NULL'),
            COALESCE(NEW.actual_amount::TEXT, 'NULL'),
            COALESCE(NEW.actual_amount, 0) - COALESCE(OLD.actual_amount, 0));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_budget_audit ON budget_items;
CREATE TRIGGER trg_budget_audit
  AFTER UPDATE ON budget_items
  FOR EACH ROW EXECUTE FUNCTION log_budget_change();


-- ============================================================
-- ROW-LEVEL SECURITY
-- Public reads, authenticated writes only.
-- ============================================================

ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Public read policies
DO $$ BEGIN
  CREATE POLICY "public_read_budget" ON budget_items FOR SELECT USING (true);
  CREATE POLICY "public_read_budget_history" ON budget_history FOR SELECT USING (true);
  CREATE POLICY "public_read_snapshots" ON budget_snapshots FOR SELECT USING (true);
  CREATE POLICY "public_read_settings" ON budget_settings FOR SELECT USING (true);
  CREATE POLICY "public_read_timeline" ON timeline_events FOR SELECT USING (true);
  CREATE POLICY "public_read_decisions" ON decisions FOR SELECT USING (true);
  CREATE POLICY "public_read_journal" ON journal_entries FOR SELECT USING (true);
  CREATE POLICY "public_read_photos" ON photos FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Authenticated write policies (only logged-in users can edit)
DO $$ BEGIN
  CREATE POLICY "auth_write_budget" ON budget_items FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_snapshots" ON budget_snapshots FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_settings" ON budget_settings FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_timeline" ON timeline_events FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_decisions" ON decisions FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_journal" ON journal_entries FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_photos" ON photos FOR ALL USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- ============================================================
-- VIEWS - Convenient aggregates
-- ============================================================

CREATE OR REPLACE VIEW v_budget_totals AS
SELECT
  COALESCE(SUM(planned_amount), 0) AS total_planned,
  COALESCE(SUM(COALESCE(actual_amount, planned_amount)), 0) AS total_committed,
  COALESCE(SUM(actual_amount), 0) AS total_actual,
  COUNT(*) FILTER (WHERE actual_amount IS NOT NULL) AS items_paid,
  COUNT(*) AS items_total
FROM budget_items
WHERE is_active = TRUE AND is_included = FALSE;

CREATE OR REPLACE VIEW v_budget_by_category AS
SELECT
  category,
  COALESCE(SUM(planned_amount), 0) AS planned,
  COALESCE(SUM(actual_amount), 0) AS actual,
  COALESCE(SUM(COALESCE(actual_amount, planned_amount)), 0) AS committed,
  COUNT(*) AS items
FROM budget_items
WHERE is_active = TRUE AND is_included = FALSE
GROUP BY category
ORDER BY MIN(sort_order);
