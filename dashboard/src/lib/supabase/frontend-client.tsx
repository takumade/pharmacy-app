
import { User } from '@/types/user.type';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { getCookie } from 'cookies-next';

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)






export default supabase
