// ============================================================
// SUPABASE CONFIG
// Fill these in after creating your Supabase project.
// See: README.md → "Setting up Supabase"
//
// The ANON key is PUBLIC (safe to expose in client code) — it
// only allows actions that match your Row-Level Security policies.
// Anyone can READ (public); only authenticated users can WRITE.
// ============================================================

window.SUPABASE_CONFIG = {
  // Replace these with your project URL and anon key:
  url: 'YOUR_SUPABASE_URL',          // e.g. https://xxxxx.supabase.co
  anonKey: 'YOUR_SUPABASE_ANON_KEY'  // long string starting with "eyJ..."
};

// Check if Supabase is configured (will fall back to hardcoded data if not)
window.SUPABASE_ENABLED = !window.SUPABASE_CONFIG.url.startsWith('YOUR_');
