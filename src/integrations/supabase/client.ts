
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vifttiukagnyhyfiptrn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZnR0aXVrYWdueWh5ZmlwdHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzMwNTEsImV4cCI6MjA1ODI0OTA1MX0.BR58aVq64csPscJPYTM9E9NqF57U8KOQOP9W5TdFMjk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
