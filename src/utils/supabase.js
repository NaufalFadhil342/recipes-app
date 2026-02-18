import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export const withAuth = async (callback) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      await supabase.auth.signOut();
      throw new Response("Unauthorized - Please log in again", { status: 401 });
    }

    return callback(session);
  } catch (error) {
    if (error.message?.includes("JWT") || error.message?.includes("expired")) {
      await supabase.auth.signOut();
      throw new Response("Session expired - Please log in again", {
        status: 401,
      });
    }
    throw error;
  }
};

export const requireAuth = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    await supabase.auth.signOut();
    return null;
  }

  return session;
};
