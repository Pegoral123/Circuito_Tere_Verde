import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Attraction = {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string | null;
  opening_hours: string | null;
  location: string;
  latitude: number | null;
  longitude: number | null;
  contact: string | null;
  created_at: string;
};

export type Route = {
  id: string;
  name: string;
  description: string;
  type: string;
  difficulty: string;
  distance_km: number;
  duration_hours: number;
  elevation_gain_m: number;
  image_url: string | null;
  map_url: string | null;
  highlights: string[] | null;
  created_at: string;
};
