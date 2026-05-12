-- ============================================================
-- XENIA HOME BUILD - ONE-SHOT SUPABASE SETUP
-- Copy this entire file. Paste into Supabase SQL Editor. Run.
-- That's it. Done.
-- ============================================================

-- ============== TABLES ==============
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

CREATE TABLE IF NOT EXISTS timeline_events (
  id BIGSERIAL PRIMARY KEY,
  date_label TEXT NOT NULL,
  sort_date DATE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'planned',
  completed_date DATE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_timeline_order ON timeline_events(sort_order, sort_date);

CREATE TABLE IF NOT EXISTS decisions (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  priority TEXT DEFAULT 'med',
  status TEXT DEFAULT 'pending',
  decision TEXT,
  notes TEXT,
  decided_date DATE,
  estimated_cost INTEGER,
  actual_cost INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_decisions_category ON decisions(category, priority);

CREATE TABLE IF NOT EXISTS journal_entries (
  id BIGSERIAL PRIMARY KEY,
  entry_date DATE DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  body TEXT,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_journal_date ON journal_entries(entry_date DESC);

CREATE TABLE IF NOT EXISTS photos (
  id BIGSERIAL PRIMARY KEY,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  caption TEXT,
  taken_date DATE,
  phase TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_photos_phase ON photos(phase, taken_date DESC);

-- ============== TRIGGERS ==============
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_budget_items_updated ON budget_items;
CREATE TRIGGER trg_budget_items_updated BEFORE UPDATE ON budget_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_timeline_updated ON timeline_events;
CREATE TRIGGER trg_timeline_updated BEFORE UPDATE ON timeline_events
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_decisions_updated ON decisions;
CREATE TRIGGER trg_decisions_updated BEFORE UPDATE ON decisions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

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
CREATE TRIGGER trg_budget_audit AFTER UPDATE ON budget_items
  FOR EACH ROW EXECUTE FUNCTION log_budget_change();

-- ============== RLS ==============
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "public_read_budget" ON budget_items FOR SELECT USING (true);
  CREATE POLICY "public_read_budget_history" ON budget_history FOR SELECT USING (true);
  CREATE POLICY "public_read_snapshots" ON budget_snapshots FOR SELECT USING (true);
  CREATE POLICY "public_read_settings" ON budget_settings FOR SELECT USING (true);
  CREATE POLICY "public_read_timeline" ON timeline_events FOR SELECT USING (true);
  CREATE POLICY "public_read_decisions" ON decisions FOR SELECT USING (true);
  CREATE POLICY "public_read_journal" ON journal_entries FOR SELECT USING (true);
  CREATE POLICY "public_read_photos" ON photos FOR SELECT USING (true);
  CREATE POLICY "auth_write_budget" ON budget_items FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_snapshots" ON budget_snapshots FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_settings" ON budget_settings FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_timeline" ON timeline_events FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_decisions" ON decisions FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_journal" ON journal_entries FOR ALL USING (auth.role() = 'authenticated');
  CREATE POLICY "auth_write_photos" ON photos FOR ALL USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============== VIEWS ==============
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
SELECT category,
  COALESCE(SUM(planned_amount), 0) AS planned,
  COALESCE(SUM(actual_amount), 0) AS actual,
  COALESCE(SUM(COALESCE(actual_amount, planned_amount)), 0) AS committed,
  COUNT(*) AS items
FROM budget_items
WHERE is_active = TRUE AND is_included = FALSE
GROUP BY category
ORDER BY MIN(sort_order);

-- ============== SEED DATA ==============
INSERT INTO budget_settings (id, target_budget, contingency_pct, loan_costs, base_price, elevation_b, square_feet)
VALUES (1, 750000, 0.10, 8000, 525210, 12000, 3031)
ON CONFLICT (id) DO UPDATE SET target_budget = EXCLUDED.target_budget;

INSERT INTO budget_items (category, name, planned_amount, is_included, sort_order, notes) VALUES
  ('Base Home', 'Harbor Spring Base Price (Xenia)', 525210, FALSE, 10, 'Per Xenia regional pricing'),
  ('Base Home', 'Elevation B Upgrade', 12000, FALSE, 11, 'Premium porch, metal roof accents, stone'),
  ('Upgrades', 'Hardwood Floor Upgrade', 5000, FALSE, 20, 'Beyond Gold Package standard'),
  ('Upgrades', 'Kitchen Upgrade (quartz, cabinets)', 7000, FALSE, 21, 'Premium quartz, level 3 cabinets'),
  ('Upgrades', 'Fireplace', 5000, FALSE, 22, 'Standard wood-burning fireplace'),
  ('Upgrades', 'Morning Room', 0, TRUE, 23, 'Included in plan'),
  ('Customizations', 'Basement Bathroom Rough-In', 4500, FALSE, 30, 'Plumbing stub-outs for future bath'),
  ('Customizations', 'Egress Window (1)', 3500, FALSE, 31, 'Required for future basement bedroom'),
  ('Site Work', 'Land (Xenia Township)', 100000, FALSE, 40, 'Placeholder - survey June 2026'),
  ('Site Work', 'Well Drilling', 12000, FALSE, 41, 'Depth varies (100-400 ft)'),
  ('Site Work', 'Septic System', 12000, FALSE, 42, 'Pending perc test'),
  ('Site Work', 'Electric Service Hookup', 5000, FALSE, 43, 'Depends on distance from road'),
  ('Site Work', 'Gravel Driveway (150 ft)', 4500, FALSE, 44, '~$20-40/linear ft'),
  ('Site Work', 'Site Prep & Grading', 8000, FALSE, 45, 'Clearing, grading, foundation prep'),
  ('Contingency & Loan', 'Construction Loan Costs', 8000, FALSE, 51, 'Interest, origination, appraisal, closing')
ON CONFLICT DO NOTHING;

INSERT INTO budget_snapshots (snapshot_date, total_planned, total_committed, notes)
SELECT CURRENT_DATE,
       (SELECT total_planned FROM v_budget_totals),
       (SELECT total_committed FROM v_budget_totals),
       'Initial baseline'
WHERE NOT EXISTS (SELECT 1 FROM budget_snapshots);

INSERT INTO timeline_events (date_label, sort_date, title, description, status, sort_order) VALUES
  ('Done',                 '2026-04-01', 'Land in contract',              'Xenia Township lot under contract',                      'done',    10),
  ('Early June 2026',      '2026-06-01', 'Land survey',                    'Boundary survey to confirm buildable area',              'current', 20),
  ('June 2026',            '2026-06-15', 'Diyanni design meeting',         'Lock in Harbor Spring + Elevation B + upgrades',         'planned', 30),
  ('June–July 2026',       '2026-06-20', 'Well + septic site assessment',  'Perc test, well depth estimate',                         'planned', 40),
  ('July 2026',            '2026-07-01', 'Construction loan pre-approval', 'Construction-to-perm with local lender',                 'planned', 50),
  ('Aug–Sep 2026',         '2026-08-15', 'Land close + contract signed',   'Diyanni build contract executed',                        'planned', 60),
  ('Sep 2026 – Jul 2027',  '2026-09-01', 'Construction',                   '~10 month build time',                                   'planned', 70),
  ('Aug 2027',             '2027-08-01', 'Move-in + sell current home',    'Pay down construction loan with sale proceeds',          'planned', 80)
ON CONFLICT DO NOTHING;

INSERT INTO decisions (slug, category, title, due_date, priority, sort_order) VALUES
  ('elevation',          'Exterior',     'Confirm Elevation B with Diyanni',     '2026-06-30', 'high', 10),
  ('stone',              'Exterior',     'Choose stone color/style',              '2026-06-30', 'med',  11),
  ('garage-door',        'Exterior',     'Choose garage door style',              '2026-06-30', 'med',  12),
  ('front-door',         'Exterior',     'Front door style + color',              '2026-06-30', 'med',  13),
  ('exterior-paint',     'Exterior',     'Siding + trim color',                   '2026-09-30', 'med',  14),
  ('kitchen-cabinets',   'Kitchen',      'Cabinet style + color',                 '2026-07-31', 'high', 20),
  ('kitchen-countertop', 'Kitchen',      'Quartz vs granite countertops',         '2026-07-31', 'high', 21),
  ('kitchen-island',     'Kitchen',      'Island size + waterfall edge?',         '2026-07-31', 'med',  22),
  ('gas-line',           'Kitchen',      'Confirm gas line for range',            '2026-07-31', 'high', 23),
  ('pantry',             'Kitchen',      'Walk-in pantry layout',                 '2026-07-31', 'med',  24),
  ('flooring-main',      'Flooring',     'Hardwood vs LVT in main areas',         '2026-07-31', 'high', 30),
  ('carpet-color',       'Flooring',     'Carpet color for bedrooms',             '2026-07-31', 'low',  31),
  ('tile-baths',         'Flooring',     'Bathroom tile selections',              '2026-07-31', 'med',  32),
  ('master-bath',        'Bathrooms',    'Master bath layout (tub + shower?)',    '2026-07-31', 'high', 40),
  ('vanity-style',       'Bathrooms',    'Vanity style + color',                  '2026-07-31', 'med',  41),
  ('fireplace-style',    'Living Areas', 'Fireplace style + surround',            '2026-07-31', 'med',  50),
  ('study-built-ins',    'Living Areas', 'Built-ins in study?',                   '2026-07-31', 'low',  51),
  ('basement-egress',    'Basement',     'Egress window location',                '2026-08-31', 'high', 60),
  ('basement-rough',     'Basement',     'Bathroom rough-in location',            '2026-08-31', 'high', 61),
  ('well-perc',          'Site Work',    'Schedule perc test',                    '2026-06-30', 'high', 70),
  ('well-quote',         'Site Work',    'Get well drilling quotes',              '2026-07-31', 'high', 71),
  ('septic-quote',       'Site Work',    'Get septic system quotes',              '2026-07-31', 'high', 72),
  ('driveway',           'Site Work',    'Driveway path + materials',             '2026-08-31', 'med',  73),
  ('loan-prequalified',  'Financing',    'Get pre-qualified (construction loan)', '2026-07-31', 'high', 80),
  ('loan-lender',        'Financing',    'Choose lender',                          '2026-07-31', 'high', 81),
  ('appliances',         'Appliances',   'Choose appliance package',              '2026-08-31', 'med',  90),
  ('lighting',           'Lighting',     'Light fixture selections',              '2026-08-31', 'low',  100),
  ('paint',              'Interior',     'Paint color palette',                   '2026-09-30', 'low',  110),
  ('deck-patio',         'Outdoor',      'Deck/patio plan (Phase 1)',             '2026-09-30', 'med',  120),
  ('outdoor-utilities',  'Outdoor',      'Stub-outs for future outdoor kitchen',  '2026-08-31', 'med',  121)
ON CONFLICT (slug) DO NOTHING;

-- DONE! Now grab your API keys from Settings → API in the Supabase dashboard
-- and paste them into js/config.js
