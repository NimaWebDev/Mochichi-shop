import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
<<<<<<< HEAD
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
=======
  process.env.SUPABASE_SERVICE_ROLE_KEY!
>>>>>>> 02ee0cc (fix bugs)
);
