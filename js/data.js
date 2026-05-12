// =================== XENIA HOME BUILD DATA ===================
// Edit these values as your numbers firm up; the site recalculates automatically.

window.HOME = {
  // ---------- DECISION ----------
  // Plan locked in May 2026 after evaluating 11 plans across 6 builders.
  // See why.html for the full decision rationale.
  decisionDate: "2026-05-12",
  decisionStatus: "confirmed",

  // ---------- PLAN BASICS ----------
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
      { name: "Hardwood Floor Upgrade", amount: 5000, note: "Beyond Gold Package standard" },
      { name: "Kitchen Upgrade (quartz, cabinets)", amount: 7000, note: "Premium quartz, level 3 cabinets" },
      { name: "Fireplace", amount: 5000, note: "Standard wood-burning fireplace" },
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
      { category: "Garage", items: ["3-Car Garage (standard)", "Insulated steel garage doors", "Side entry door", "Garage door opener with two transmitters", "Keyless entry pad"] },
      { category: "Ceilings & Structure", items: ["9' main floor ceilings", "9' basement ceilings", "8' poured concrete basement walls", "Full basement (no crawl space)", "30-year transferable basement waterproofing warranty"] },
      { category: "Kitchen", items: ["Granite countertops (3cm)", "Tile backsplash", "Merillat maple/oak cabinets", "Soft-close drawers + 6-way hinges", "42\" upper cabinets", "Rollout shelf in base cabinets", "Half horsepower garbage disposal"] },
      { category: "Flooring", items: ["LVT in kitchen, foyer, great room, baths, laundry", "Mohawk SmartStrand carpet w/ padding throughout"] },
      { category: "Bathrooms", items: ["Comfort height vanities", "Quartz vanity tops (white china undermount sinks)", "Sterling Vikrel 4-piece tub/shower", "Kohler comfort height elongated toilets"] },
      { category: "Plumbing & HVAC", items: ["PEX water lines", "Delta water saving faucets", "50-gallon electric water heater", "Lennox 96% efficient 2-stage gas furnace", "Lennox 13.4 SEER2 high efficiency AC"] },
      { category: "Electrical", items: ["200-amp electrical service", "LED light bulbs throughout", "Smoke + CO detectors", "GFCI outlets per code", "Garage coach lights"] },
      { category: "Exterior", items: ["Maintenance-free vinyl siding (lifetime warranty)", "Cultured stone plinth on front", "Seamless aluminum gutters", "Steep-pitched roof designs", "CertainTeed dimensional shingles (limited lifetime)", "Energy-efficient LowE windows w/ argon gas"] },
      { category: "Warranty", items: ["10-year insured transferable structural warranty", "Locked-in price (with financing in 60 days)", "Recipient of National Housing Quality (NHQ) Award"] }
    ]
  }
};
