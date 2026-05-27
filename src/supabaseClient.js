import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tocoapazcefpiytczjop.supabase.co';
const supabaseAnonKey = 'sb_publishable_espkys4mz7TKqqERkTqnIQ_X673mSZk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
