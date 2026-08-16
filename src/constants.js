

export const BASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const SIGNUP_URL = BASE_URL + "/auth/v1/signup";

export const LOGIN_URL =
  BASE_URL + "/auth/v1/token?grant_type=password";

export const LOGOUT_URL = BASE_URL + "/auth/v1/logout";

export const SUPABASE_API_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY;

export const GET_ALL_COURSES =
  BASE_URL + "/rest/v1/courses?select=*";