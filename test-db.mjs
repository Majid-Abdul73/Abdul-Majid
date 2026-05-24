import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  try {
    const { data, error } = await supabase.from("courses").select("*").limit(1);
    if (error) {
      console.log("Supabase error:", error);
    } else {
      console.log("Data:", data);
    }
  } catch (err) {
    console.log("Catch error:", err);
  }
}
test();
