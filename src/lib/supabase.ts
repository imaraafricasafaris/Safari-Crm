import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fxnakumvpeiafmoxwjqi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4bmFrdW12cGVpYWZtb3h3anFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMzU1NzcsImV4cCI6MjA0ODYxMTU3N30.i1ULonqbLqrNSX8D0ccMDl1ZiaVxm4njIJJj4G2pwHg';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});

// Test connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('count')
      .limit(1)
      .single();

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};