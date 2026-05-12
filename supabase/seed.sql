-- ============================================================
-- SEED DATA - Initial values matching current static data.
-- Run this AFTER schema.sql to populate.
-- Safe to re-run (uses INSERT ... ON CONFLICT or TRUNCATE patterns).
-- ============================================================

-- Reset all tables (only on initial seeding, comment out for re-runs)
-- TRUNCATE budget_items, budget_history, budget_snapshots, budget_settings,
--          timeline_events, decisions RESTART IDENTITY CASCADE;

-- ---------- BUDGET SETTINGS ----------
INSERT INTO budget_settings (id, target_budget, contingency_pct, loan_costs, base_price, elevation_b, square_feet)
VALUES (1, 750000, 0.10, 8000, 525210, 12000, 3031)
ON CONFLICT (id) DO UPDATE SET
  target_budget = EXCLUDED.target_budget,
  square_feet = EXCLUDED.square_feet,
  updated_at = NOW();

-- ---------- BUDGET ITEMS ----------
INSERT INTO budget_items (category, name, planned_amount, is_included, sort_order, notes) VALUES
  ('Base Home', 'Harbor Spring Base Price (Xenia)', 525210, FALSE, 10, 'Per Xenia regional pricing May 2026'),
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

-- Initial budget snapshot for evolution tracking
INSERT INTO budget_snapshots (snapshot_date, total_planned, total_committed, notes)
SELECT CURRENT_DATE,
       (SELECT total_planned FROM v_budget_totals),
       (SELECT total_committed FROM v_budget_totals),
       'Initial seed snapshot';

-- ---------- TIMELINE EVENTS ----------
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

-- ---------- DECISIONS ----------
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
