
import { createClient } from '@supabase/supabase-js';

// Create the Supabase client directly
export const supabase = createClient(
  "https://vifttiukagnyhyfiptrn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZnR0aXVrYWdueWh5ZmlwdHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzMwNTEsImV4cCI6MjA1ODI0OTA1MX0.BR58aVq64csPscJPYTM9E9NqF57U8KOQOP9W5TdFMjk",
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true
    }
  }
);

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connection successful, session:', !!data.session);
  }
});
