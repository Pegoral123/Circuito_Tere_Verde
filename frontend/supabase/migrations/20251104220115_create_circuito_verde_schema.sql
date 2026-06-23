/*
  # Circuito Verde Tourism Database Schema

  1. New Tables
    - `attractions`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the attraction
      - `description` (text) - Detailed description
      - `category` (text) - Type: natureza, cultura, aventura, gastronomia
      - `image_url` (text) - Image URL
      - `opening_hours` (text) - Operating hours
      - `location` (text) - Address/location
      - `latitude` (numeric) - GPS latitude
      - `longitude` (numeric) - GPS longitude
      - `contact` (text) - Contact information
      - `created_at` (timestamptz)
      
    - `routes`
      - `id` (uuid, primary key)
      - `name` (text) - Route name
      - `description` (text) - Route description
      - `type` (text) - caminhada, ciclismo, trilha
      - `difficulty` (text) - facil, moderado, dificil
      - `distance_km` (numeric) - Distance in kilometers
      - `duration_hours` (numeric) - Estimated duration
      - `elevation_gain_m` (numeric) - Elevation gain in meters
      - `image_url` (text) - Route image
      - `map_url` (text) - Map/GPX file URL
      - `highlights` (text[]) - Key points of interest
      - `created_at` (timestamptz)
      
    - `route_waypoints`
      - `id` (uuid, primary key)
      - `route_id` (uuid, foreign key to routes)
      - `order_index` (integer) - Order in route
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `name` (text) - Waypoint name
      - `description` (text)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (tourism app is public)
*/

CREATE TABLE IF NOT EXISTS attractions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  image_url text,
  opening_hours text,
  location text NOT NULL,
  latitude numeric,
  longitude numeric,
  contact text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  difficulty text NOT NULL,
  distance_km numeric NOT NULL,
  duration_hours numeric NOT NULL,
  elevation_gain_m numeric DEFAULT 0,
  image_url text,
  map_url text,
  highlights text[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS route_waypoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id uuid NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  order_index integer NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  name text NOT NULL,
  description text
);

ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_waypoints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view attractions"
  ON attractions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view routes"
  ON routes FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view route waypoints"
  ON route_waypoints FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_attractions_category ON attractions(category);
CREATE INDEX IF NOT EXISTS idx_routes_type ON routes(type);
CREATE INDEX IF NOT EXISTS idx_route_waypoints_route_id ON route_waypoints(route_id);
CREATE INDEX IF NOT EXISTS idx_route_waypoints_order ON route_waypoints(route_id, order_index);