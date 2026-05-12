// ============================================================
// DATABASE LAYER (Supabase)
// All reads/writes go through here. If Supabase isn't configured,
// pages will fall back to hardcoded data in data.js.
// ============================================================

(function() {
  if (!window.SUPABASE_ENABLED) {
    window.DB = null;
    console.info('[DB] Supabase not configured — using static data fallback');
    return;
  }

  const { createClient } = window.supabase;
  const client = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true }
  });

  const DB = {
    client,

    // -------------- AUTH --------------
    async signIn(email, password) {
      return await client.auth.signInWithPassword({ email, password });
    },
    async signOut() {
      return await client.auth.signOut();
    },
    async getUser() {
      const { data } = await client.auth.getUser();
      return data.user;
    },
    onAuthChange(cb) {
      return client.auth.onAuthStateChange((event, session) => cb(session?.user || null));
    },

    // -------------- BUDGET --------------
    async getBudgetItems() {
      const { data, error } = await client
        .from('budget_items')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data || [];
    },
    async getBudgetTotals() {
      const { data, error } = await client.from('v_budget_totals').select('*').single();
      if (error) throw error;
      return data;
    },
    async getBudgetByCategory() {
      const { data, error } = await client.from('v_budget_by_category').select('*');
      if (error) throw error;
      return data || [];
    },
    async getBudgetSettings() {
      const { data, error } = await client.from('budget_settings').select('*').eq('id', 1).single();
      if (error) throw error;
      return data;
    },
    async updateBudgetItem(id, updates) {
      const { data, error } = await client.from('budget_items').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    async createBudgetItem(item) {
      const { data, error } = await client.from('budget_items').insert(item).select().single();
      if (error) throw error;
      return data;
    },
    async deleteBudgetItem(id) {
      // Soft delete - set is_active = false
      const { error } = await client.from('budget_items').update({ is_active: false }).eq('id', id);
      if (error) throw error;
    },
    async updateBudgetSettings(updates) {
      const { data, error } = await client.from('budget_settings').update(updates).eq('id', 1).select().single();
      if (error) throw error;
      return data;
    },

    // -------------- BUDGET HISTORY / SNAPSHOTS --------------
    async getBudgetHistory(limit = 100) {
      const { data, error } = await client
        .from('budget_history')
        .select('*')
        .order('changed_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    },
    async getSnapshots() {
      const { data, error } = await client
        .from('budget_snapshots')
        .select('*')
        .order('snapshot_date', { ascending: true });
      if (error) throw error;
      return data || [];
    },
    async createSnapshot(notes = '') {
      // Fetch current totals
      const totals = await this.getBudgetTotals();
      const { data, error } = await client.from('budget_snapshots').insert({
        snapshot_date: new Date().toISOString().slice(0, 10),
        total_planned: totals.total_planned,
        total_actual: totals.total_actual,
        total_committed: totals.total_committed,
        notes
      }).select().single();
      if (error) throw error;
      return data;
    },

    // -------------- TIMELINE --------------
    async getTimeline() {
      const { data, error } = await client.from('timeline_events').select('*').order('sort_order');
      if (error) throw error;
      return data || [];
    },
    async updateTimelineEvent(id, updates) {
      const { data, error } = await client.from('timeline_events').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    async createTimelineEvent(event) {
      const { data, error } = await client.from('timeline_events').insert(event).select().single();
      if (error) throw error;
      return data;
    },
    async deleteTimelineEvent(id) {
      const { error } = await client.from('timeline_events').delete().eq('id', id);
      if (error) throw error;
    },

    // -------------- DECISIONS --------------
    async getDecisions() {
      const { data, error } = await client.from('decisions').select('*').order('sort_order');
      if (error) throw error;
      return data || [];
    },
    async updateDecision(id, updates) {
      const { data, error } = await client.from('decisions').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    async createDecision(decision) {
      const { data, error } = await client.from('decisions').insert(decision).select().single();
      if (error) throw error;
      return data;
    },
    async deleteDecision(id) {
      const { error } = await client.from('decisions').delete().eq('id', id);
      if (error) throw error;
    },

    // -------------- JOURNAL --------------
    async getJournal() {
      const { data, error } = await client.from('journal_entries').select('*').order('entry_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    async createJournalEntry(entry) {
      const { data, error } = await client.from('journal_entries').insert(entry).select().single();
      if (error) throw error;
      return data;
    }
  };

  window.DB = DB;
})();
