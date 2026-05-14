// =================== XENIA HOME BUILD DATA ===================
// Edit these values as your numbers firm up; the site recalculates automatically.

// ============================================================
// PLAN OPTIONS - currently choosing between Kelly + Harbor Spring
// ============================================================
window.PLANS = {
  kelly: {
    id: "kelly",
    name: "The Kelly",
    tagline: "Future-Proof Two Story",
    builder: "Diyanni Custom Homes",
    sqft: 3461,
    bedrooms: 5,
    bathrooms: 4,
    stories: 2,
    garageType: "3-Car Side-Load",
    garageSqft: 728,
    basePrice: 574980,
    masterLocation: "Upstairs",
    firstFloorGuest: true,
    plansUrl: "https://diyannihomes.com/Plans/FloorPlanDetails/THE-KELLY",
    virtualTourUrl: "https://my.matterport.com/show/?m=bdut7FnuNeo",
    heroImage: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_73_638458538859422018.jpg",
    floorPlans: {
      level1: "https://admin.diyannihomes.com/FloorPlanImages/StandardFloorPlan_THE%20KELLY_Level_1_FloorPlanId_73_639129818040490468.jpg",
      level2: "https://admin.diyannihomes.com/FloorPlanImages/StandardFloorPlan_THE%20KELLY_Level_2_FloorPlanId_73_638549124996052385.jpg",
      elevations: [
        { name: "Elevation A", url: "https://admin.diyannihomes.com/content/img/StandardElevation_ElevationId_16572_20251008072053.jpg", desc: "3-car side-load garage, straight porch posts, standard roof trusses, window in garage gable." },
        { name: "Elevation B (preferred)", url: "https://admin.diyannihomes.com/content/img/StandardElevation_ElevationId_16339_20250916091117.jpg", desc: "Cedar-wrapped beams + porch posts + gable details. Premium roof trusses, expanded front porch (+97 SF), Father/Son gable at garage." },
        { name: "Elevation C", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_73_638458538859422018.jpg", desc: "Full cultured stone at garage bumps + porch exterior. Casement/picture windows on front. Aluminum siding w/ woodgrain look. Hip roof system." }
      ]
    },
    rooms: {
      level1: ["Foyer", "Study (home office)", "Great Room", "Kitchen", "Morning Room", "Powder Room", "Mudroom / Laundry", "Guest BR (1st floor) + Full Bath", "3-Car Side-Load Garage"],
      level2: ["Master Bedroom", "Master Bathroom", "Walk-in Closet (Master)", "Bedroom 3 (Kid)", "Bedroom 4 (Kid)", "Bedroom 5", "Shared Bath(s)"]
    },
    highlights: [
      "5 bedrooms — 1 on 1st floor (guest suite), 4 upstairs",
      "Future-proof layout — grows with the family from day one",
      "4 bathrooms — solves bathroom traffic forever",
      "3-car SIDE-LOAD garage (front facade not dominated by garage)",
      "Best $/SF among Diyanni plans ($166/SF)"
    ]
  },

  rosedale: {
    id: "rosedale",
    name: "The Rosedale",
    tagline: "First Floor Master · Modern Home",
    builder: "Diyanni Custom Homes",
    sqft: 2872,
    bedrooms: 3,
    bathrooms: 3.5,
    stories: 2,
    garageType: "3-Car",
    garageSqft: 728,
    basePrice: 529090,
    masterLocation: "1st Floor",
    firstFloorGuest: false,
    plansUrl: "https://diyannihomes.com/Plans/FloorPlanDetails/THE-ROSEDALE",
    virtualTourUrl: "https://my.matterport.com/show/?m=fsNkDt5pMZN",
    heroImage: "https://admin.diyannihomes.com/galleries/T%2010555%20Beale%20Rd00107.jpg",
    floorPlans: {
      level1: "https://admin.diyannihomes.com/FloorPlanImages/StandardFloorPlan_THE%20ROSEDALE_Level_1_FloorPlanId_72_639129844189102631.jpg",
      level2: "https://admin.diyannihomes.com/FloorPlanImages/StandardFloorPlan_THE%20ROSEDALE_Level_2_FloorPlanId_72_638307272660248156.jpg",
      elevations: [
        { name: "Elevation A", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_72_638271856885652232.jpg", desc: "3-car front load garage, straight porch posts, standard roof trusses." },
        { name: "Elevation B (preferred)", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_72_638271865552856347.jpg", desc: "Premium roof trusses, expanded porch (+82 SF). Optional dormer, tapered porch posts, metal roofing." },
        { name: "Elevation C", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_72_638271872360047622.jpg", desc: "Hip roof system, casement windows w/ transoms across front, 1x4 trim boards." },
        { name: "Elevation D", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_72_638271880729117007.jpg", desc: "Board & batten siding on front, cedar-wrapped porch posts + breast beam." }
      ]
    },
    rooms: {
      level1: ["Foyer", "Study (home office)", "Great Room", "Kitchen", "Morning Room", "Master Bedroom (1st floor)", "Master Bathroom + Walk-in Closet", "Powder Room / Half Bath", "Mudroom / Laundry", "3-Car Garage"],
      level2: ["Loft", "Bedroom 2", "Bedroom 3", "Shared Bath(s)"]
    },
    highlights: [
      "FIRST FLOOR MASTER — age-in-place ready",
      "Morning room built in off the kitchen",
      "2 bedrooms upstairs (smaller family or growing teens)",
      "3.5 baths (rare for this SF)",
      "Loft upstairs as flex space"
    ]
  },

  harborSpring: {
    id: "harborSpring",
    name: "The Harbor Spring",
    tagline: "Two Story · Family Layout",
    builder: "Diyanni Custom Homes",
    sqft: 3031,
    bedrooms: 4,
    bathrooms: 2.5,
    stories: 2,
    garageType: "3-Car Front-Load",
    garageSqft: 724,
    basePrice: 525210,
    masterLocation: "Upstairs",
    firstFloorGuest: false,
    plansUrl: "https://diyannihomes.com/Plans/FloorPlanDetails/THE-HARBOR-SPRING-",
    virtualTourUrl: "https://my.matterport.com/show/?m=dRwcTENFmXJ",
    heroImage: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00094-2.jpg",
    floorPlans: {
      level1: "https://admin.diyannihomes.com/FloorPlanImages/StandardFloorPlan_THE%20HARBOR%20SPRING%20_Level_1_FloorPlanId_1150_639129805076418062.jpg",
      level2: "https://admin.diyannihomes.com/FloorPlanImages/StandardFloorPlan_THE%20HARBOR%20SPRING%20_Level_2_FloorPlanId_1150_638548285979688100.jpg",
      elevations: [
        { name: "Elevation A", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_1150_638382686937503062.jpg", desc: "3-car front-load garage, straight porch posts, standard roof trusses." },
        { name: "Elevation B (preferred)", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_1150_638382706034642088.jpg", desc: "Premium roof trusses, upgraded gutters, expanded front porch (+59 SF). Optional tapered Craftsman posts, metal roofing, black windows." },
        { name: "Elevation C", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_1150_638368838783032555.jpg", desc: "Full cultured stone face, hip roof system, swept porch wall." }
      ]
    },
    rooms: {
      level1: ["Foyer", "Study (home office)", "Great Room", "Kitchen", "Morning Room (15' × 11')", "Powder Room", "Mudroom / Laundry", "3-Car Front-Load Garage"],
      level2: ["Master Bedroom", "Master Bathroom", "Walk-in Closet (Master)", "Bedroom 2 (Kid)", "Bedroom 3 (Kid)", "Bedroom 4 (Guest)", "Shared Bath", "Game Room / Loft"]
    },
    highlights: [
      "All 4 BR upstairs — kids close to parents",
      "1st floor study (dedicated home office)",
      "Built-in morning room off kitchen",
      "Game room / loft upstairs for kids",
      "Best size/budget value at $173/SF"
    ]
  }
};

// ============================================================
// CURRENT BUILD STATE
// Set primaryPlan to lock in a choice; null while comparing.
// ============================================================
window.HOME = {
  // ---------- DECISION ----------
  decisionDate: null,
  decisionStatus: "leaning-kelly",  // 'comparing' | 'leaning-kelly' | 'leaning-harborSpring' | 'locked-in'
  primaryPlan: "kelly",             // 'kelly' | 'harborSpring' | null
  contenders: ["kelly", "rosedale", "harborSpring"],
  leaningNote: "Wife loves the Kelly — its future-proof layout and 1st floor guest suite. Still pending firm Diyanni quote in June.",

  // ---------- PLAN BASICS (defaults to Harbor Spring for backward compat) ----------
  plan: "The Harbor Spring",
  builder: "Diyanni Custom Homes",
  location: "Xenia Township, Greene County, Ohio",
  sqft: 3031,
  bedrooms: 4,
  bathrooms: 2.5,
  stories: 2,
  garageType: "3-Car",
  garageSqft: 724,
  basePrice: 525210,
  plansUrl: "https://diyannihomes.com/Plans/FloorPlanDetails/THE-HARBOR-SPRING-",
  virtualTourUrl: "https://my.matterport.com/show/?m=dRwcTENFmXJ",
  builderPhone: "1-855-DIYANNI",
  builderEmail: "info@diyannihomes.com",

  // ---------- BUDGET ----------
  budget: {
    target: 750000,
    base: {
      basePrice: 525210,
      elevationB: 12000
    },
    upgrades: [
      { name: "Hardwood Floor Upgrade (beyond RevWood)", amount: 3000, note: "Above standard Luxury RevWood wide plank" },
      { name: "Kitchen Upgrade (premium tier)", amount: 5000, note: "Beyond standard 25-color cabinet + granite/quartz selection" },
      { name: "Fireplace", amount: 0, note: "Direct vent + custom mantel + gas line — INCLUDED in Gold", included: true },
      { name: "Morning Room", amount: 0, note: "Included in plan", included: true }
    ],
    customizations: [
      { name: "Basement Bathroom Rough-In", amount: 4500, note: "Plumbing stub-outs for future bath" },
      { name: "Egress Window (1)", amount: 3500, note: "Required for future basement bedroom" }
    ],
    siteWork: [
      { name: "Land (Xenia Township)", amount: 100000, note: "Placeholder — survey June 2026" },
      { name: "Well Drilling", amount: 12000, note: "Depth varies (100–400 ft)" },
      { name: "Septic System", amount: 12000, note: "Pending perc test" },
      { name: "Electric Service Hookup", amount: 5000, note: "Depends on distance from road" },
      { name: "Gravel Driveway (150 ft)", amount: 4500, note: "~$20–40/linear ft" },
      { name: "Site Prep & Grading", amount: 8000, note: "Clearing, grading, foundation prep" }
    ],
    contingencyPct: 0.10,
    loanCosts: 8000
  },

  // ---------- TIMELINE ----------
  timeline: [
    { date: "Done", title: "Land in contract", desc: "Xenia Township lot under contract", status: "done" },
    { date: "Early June 2026", title: "Land survey", desc: "Boundary survey to confirm buildable area", status: "current" },
    { date: "June 2026", title: "Diyanni design meeting", desc: "Lock in Harbor Spring + Elevation B + upgrades", status: "" },
    { date: "June–July 2026", title: "Well + septic site assessment", desc: "Perc test, well depth estimate", status: "" },
    { date: "July 2026", title: "Construction loan pre-approval", desc: "Construction-to-perm with local lender", status: "" },
    { date: "Aug–Sep 2026", title: "Land close + contract signed", desc: "Diyanni build contract executed", status: "" },
    { date: "Sep 2026 – Jul 2027", title: "Construction", desc: "~10 month build time", status: "" },
    { date: "Aug 2027", title: "Move-in + sell current home", desc: "Pay down construction loan with sale proceeds", status: "" }
  ],

  // ---------- DECISIONS TO MAKE ----------
  decisions: [
    { id: "elevation", category: "Exterior", title: "Confirm Elevation B with Diyanni", due: "June 2026", priority: "high" },
    { id: "stone", category: "Exterior", title: "Choose stone color/style", due: "June 2026", priority: "med" },
    { id: "garage-door", category: "Exterior", title: "Choose garage door style", due: "June 2026", priority: "med" },
    { id: "front-door", category: "Exterior", title: "Front door style + color", due: "June 2026", priority: "med" },
    { id: "kitchen-cabinets", category: "Kitchen", title: "Cabinet style + color", due: "July 2026", priority: "high" },
    { id: "kitchen-countertop", category: "Kitchen", title: "Quartz vs granite countertops", due: "July 2026", priority: "high" },
    { id: "kitchen-island", category: "Kitchen", title: "Island size + waterfall edge?", due: "July 2026", priority: "med" },
    { id: "gas-line", category: "Kitchen", title: "Confirm gas line for range", due: "July 2026", priority: "high" },
    { id: "pantry", category: "Kitchen", title: "Walk-in pantry layout", due: "July 2026", priority: "med" },
    { id: "flooring-main", category: "Flooring", title: "Hardwood vs LVT in main areas", due: "July 2026", priority: "high" },
    { id: "carpet-color", category: "Flooring", title: "Carpet color for bedrooms", due: "July 2026", priority: "low" },
    { id: "tile-baths", category: "Flooring", title: "Bathroom tile selections", due: "July 2026", priority: "med" },
    { id: "master-bath", category: "Bathrooms", title: "Master bath layout (tub + shower?)", due: "July 2026", priority: "high" },
    { id: "vanity-style", category: "Bathrooms", title: "Vanity style + color", due: "July 2026", priority: "med" },
    { id: "fireplace-style", category: "Living Areas", title: "Fireplace style + surround", due: "July 2026", priority: "med" },
    { id: "study-built-ins", category: "Living Areas", title: "Built-ins in study?", due: "July 2026", priority: "low" },
    { id: "basement-egress", category: "Basement", title: "Egress window location", due: "Aug 2026", priority: "high" },
    { id: "basement-rough", category: "Basement", title: "Bathroom rough-in location", due: "Aug 2026", priority: "high" },
    { id: "well-perc", category: "Site Work", title: "Schedule perc test", due: "June 2026", priority: "high" },
    { id: "well-quote", category: "Site Work", title: "Get well drilling quotes", due: "July 2026", priority: "high" },
    { id: "septic-quote", category: "Site Work", title: "Get septic system quotes", due: "July 2026", priority: "high" },
    { id: "driveway", category: "Site Work", title: "Driveway path + materials", due: "Aug 2026", priority: "med" },
    { id: "loan-prequalified", category: "Financing", title: "Get pre-qualified (construction loan)", due: "July 2026", priority: "high" },
    { id: "loan-lender", category: "Financing", title: "Choose lender", due: "July 2026", priority: "high" },
    { id: "appliances", category: "Appliances", title: "Choose appliance package", due: "Aug 2026", priority: "med" },
    { id: "lighting", category: "Lighting", title: "Light fixture selections", due: "Aug 2026", priority: "low" },
    { id: "paint", category: "Interior", title: "Paint color palette", due: "Sep 2026", priority: "low" },
    { id: "exterior-paint", category: "Exterior", title: "Siding + trim color", due: "Sep 2026", priority: "med" },
    { id: "deck-patio", category: "Outdoor", title: "Deck/patio plan (Phase 1)", due: "Sep 2026", priority: "med" },
    { id: "outdoor-utilities", category: "Outdoor", title: "Stub-outs for future outdoor kitchen", due: "Aug 2026", priority: "med" },
  ],

  // ---------- GALLERY ----------
  // Using Diyanni's CDN URLs; works fine when site is hosted online
  gallery: {
    exterior: [
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00094-2.jpg", caption: "Front exterior" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00095-2.jpg", caption: "Front exterior — angle 2" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00096-2.jpg", caption: "Exterior view" },
      { url: "https://admin.diyannihomes.com/galleries/Harbor%20Spring%20Exterior.png", caption: "Exterior rendering" }
    ],
    livingAreas: [
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00001.jpg", caption: "Foyer" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00009.jpg", caption: "Foyer view 2" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00004.jpg", caption: "Study" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00007.jpg", caption: "Study view 2" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00033.jpg", caption: "Great Room" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00036.jpg", caption: "Great Room view 2" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00039.jpg", caption: "Great Room view 3" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00030.jpg", caption: "Great Room view 4" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00045.jpg", caption: "Game Room (upstairs)" }
    ],
    kitchen: [
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00022.jpg", caption: "Kitchen" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00020.jpg", caption: "Kitchen view 2" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00017.jpg", caption: "Kitchen view 3" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00027.jpg", caption: "Morning Room" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00024.jpg", caption: "Morning Room view 2" }
    ],
    bedrooms: [
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00057.jpg", caption: "Master Bedroom" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00060.jpg", caption: "Master Bedroom view 2" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00054.jpg", caption: "Master Bedroom view 3" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00069.jpg", caption: "Secondary Bedroom" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00072.jpg", caption: "Secondary Bedroom 2" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00083.jpg", caption: "Secondary Bedroom 3" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00086.jpg", caption: "Secondary Bedroom 4" }
    ],
    baths: [
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00062.jpg", caption: "Master Bath" },
      { url: "https://admin.diyannihomes.com/galleries/20260209141319605-The-Harbor-Spring-Primary-Bathroom.jpg", caption: "Primary Bath" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00080.jpg", caption: "Shared Bath" },
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00012.jpg", caption: "Powder Room" }
    ],
    other: [
      { url: "https://admin.diyannihomes.com/galleries/T%201210%20Longshore%20Rd00014.jpg", caption: "Laundry Room" }
    ]
  },

  // Floor plans
  floorPlans: {
    level1: "https://admin.diyannihomes.com/FloorPlanImages/StandardFloorPlan_THE%20HARBOR%20SPRING%20_Level_1_FloorPlanId_1150_639129805076418062.jpg",
    level2: "https://admin.diyannihomes.com/FloorPlanImages/StandardFloorPlan_THE%20HARBOR%20SPRING%20_Level_2_FloorPlanId_1150_638548285979688100.jpg",
    elevations: [
      { name: "Elevation A", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_1150_638382686937503062.jpg", desc: "Standard 3-car front load garage, straight porch posts, standard roof trusses." },
      { name: "Elevation B (preferred)", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_1150_638382706034642088.jpg", desc: "Premium roof trusses, upgraded gutters/downspouts, expanded front porch (59 SF), optional metal roof + black windows." },
      { name: "Elevation C", url: "https://admin.diyannihomes.com/content/img/StandardElevation_FloorPlanId_1150_638368838783032555.jpg", desc: "Cultured stone face on garage + porch, hip roof system, swept porch wall." }
    ]
  },

  // Gold Package pages (extracted from PDF, hosted locally)
  goldFeatures: {
    pages: [
      "images/gold-features/page-1.jpg",
      "images/gold-features/page-2.jpg",
      "images/gold-features/page-3.jpg",
      "images/gold-features/page-4.jpg",
      "images/gold-features/page-5.jpg",
      "images/gold-features/page-6.jpg",
      "images/gold-features/page-7.jpg"
    ],
    highlights: [
      { category: "Structural", items: ["2x6 exterior walls (stronger, quieter, more efficient)", "9' tall poured concrete foundation walls reinforced with steel", "Full basement design (no crawl space)", "Engineered floor beams (less floor bounce)", "Premium 3/4\" tongue & groove OSB subfloor (50-year warranty)", "Tyvek house wrap + sealing tape", "Steel I-beam with steel post in basement"] },
      { category: "Exterior", items: ["James Hardie® fiber-cement siding, soffits, rakes & trim (30-yr warranty)", "Partial cultured stone or brick on front of home", "Pella windows w/ Low-E argon, double-hung (lifetime warranty)", "Thermatru fiberglass insulated front door + sidelites", "Wayne Dalton steel insulated raised-panel garage door + openers", "True dimensional shingles w/ SureNail Technology (lifetime warranty)", "Exterior frost-free hose faucets"] },
      { category: "Garage", items: ["3-car garage standard", "Wayne Dalton insulated overhead doors w/ openers"] },
      { category: "Interior", items: ["9' ceilings on first floor", "Oversized 3½\" door casing, 5½\" baseboards", "Direct vent fireplace w/ Level 4 tile + custom-built mantel + gas line (INCLUDED)", "Luxury RevWood wide-plank flooring (foyer, great rm, study, dining, kitchen, breakfast, mud rm)", "Upgraded Level 3 stain-resistant carpet w/ 8lb pad", "Ceramic tile in baths", "11 recessed can lights + $3,500 lighting allowance"] },
      { category: "Kitchen", items: ["Granite OR Quartz countertops (15 color options)", "Decorative Level 4 tile backsplash", "42\" wall cabinets w/ 3\" crown", "Solid wood drawer boxes, full-extension hardware", "Soft-close hardware on doors + drawers", "25 cabinet paint/stain color choices", "Deluxe oversized island", "Half-horsepower garbage disposal"] },
      { category: "Bathrooms", items: ["Luxury primary bath: 6' soaking tub + separate walk-in shower w/ door", "Granite vanity tops w/ undermount sinks", "35\" tall vanity cabinets", "Delta dual-handle brushed nickel/chrome fixtures", "Comfort-height elongated toilets", "Decorative wall tile to ceiling in showers + tub/shower combos"] },
      { category: "Energy & HVAC", items: ["96% efficient 2-stage variable-speed gas furnace + 16 SEER A/C", "R-50 attic insulation, R-19 wall insulation", "Energy-saving programmable thermostat", "50-gallon energy-efficient electric hot water tank", "Special interior air infiltration package", "Award-winning HER (Home Energy Rating) scores"] },
      { category: "Electrical", items: ["200-amp electrical service", "11 recessed can lights", "$3,500 lighting package allowance", "Smoke + CO detectors", "GFCI exterior outlets by doors", "Exterior coach lights"] },
      { category: "Water Protection", items: ["Lifetime warranty water barrier system on foundation", "Interior + exterior drains around full foundation walls + sump pump", "Gravel around foundation for drainage", "Tyvek house wrap + sealing tape at windows/doors", "Professional water-intrusion inspection on every home"] },
      { category: "Warranty (Headline)", items: ["⭐ 30-YEAR structural warranty (most builders give 10)", "Lifetime warranty: roof, windows, water barrier, Delta fixtures, heat exchanger", "30-year warranty: Hardie siding, plumbing lines, house wrap", "10 years: furnace parts"] },
      { category: "The Diyanni Difference", items: ["5th generation, family-owned builder", "Building custom homes 40+ years", "Full customization service", "5× winner of Parade of Homes People's Choice Award", "B.I.A. approved", "Real-time online buyer portal to follow your build"] }
    ]
  }
};
