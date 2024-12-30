/*
  # Initial Schema Setup

  1. New Tables
    - `groups`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `collectibles`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `acquisition_date` (date)
      - `estimated_value` (decimal)
      - `condition` (enum)
      - `image_url` (text)
      - `group_id` (uuid, references groups)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create condition enum type
CREATE TYPE condition_type AS ENUM ('mint', 'excellent', 'good', 'fair', 'poor');

-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, user_id)
);

-- Create collectibles table
CREATE TABLE IF NOT EXISTS collectibles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  acquisition_date date NOT NULL,
  estimated_value decimal(10,2) NOT NULL CHECK (estimated_value >= 0),
  condition condition_type NOT NULL DEFAULT 'good',
  image_url text,
  group_id uuid REFERENCES groups(id) ON DELETE SET NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE collectibles ENABLE ROW LEVEL SECURITY;

-- Create policies for groups
CREATE POLICY "Users can create their own groups"
  ON groups
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own groups"
  ON groups
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own groups"
  ON groups
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own groups"
  ON groups
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for collectibles
CREATE POLICY "Users can create their own collectibles"
  ON collectibles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own collectibles"
  ON collectibles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own collectibles"
  ON collectibles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own collectibles"
  ON collectibles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON groups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_collectibles_updated_at
  BEFORE UPDATE ON collectibles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();