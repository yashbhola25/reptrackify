
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add detailed console logs
console.log('Initializing Supabase client');
console.log('Supabase URL exists:', !!supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

// Check for environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERROR: Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment or in a .env file.');
  
  // Add instructions for the user
  console.log('Please ensure you have:');
  console.log('1. Created a .env file in the root of your project');
  console.log('2. Added the following variables to your .env file:');
  console.log('   VITE_SUPABASE_URL=your_supabase_url');
  console.log('   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.log('3. Restarted your development server');
}

// Create a dummy Supabase client if environment variables are missing
// This allows the app to at least render without crashing
const dummySupabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
};

// Initialize the Supabase client or use the dummy client
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : dummySupabase as any;

// Test the connection if we have valid credentials
if (supabaseUrl && supabaseAnonKey) {
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection error:', error);
    } else {
      console.log('Supabase connection successful, session:', !!data.session);
    }
  });
}
