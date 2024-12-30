import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

export type Collection = Database['public']['Tables']['collections']['Row'];
export type NewCollection = Omit<Collection, 'id' | 'created_at' | 'updated_at' | 'user_id'>;

export async function getCollections() {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function createCollection(collection: NewCollection) {
  const { data, error } = await supabase
    .from('collections')
    .insert([collection])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCollection(id: string, collection: Partial<NewCollection>) {
  const { data, error } = await supabase
    .from('collections')
    .update(collection)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCollection(id: string) {
  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', id);

  if (error) throw error;
}