import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

export type Collectible = Database['public']['Tables']['collectibles']['Row'];
export type NewCollectible = Omit<Collectible, 'id' | 'created_at' | 'updated_at' | 'user_id'>;

export async function getCollectibles(collectionId?: string) {
  let query = supabase
    .from('collectibles')
    .select(`
      *,
      collections (
        id,
        name
      )
    `)
    .order('name');

  if (collectionId) {
    query = query.eq('collection_id', collectionId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function createCollectible(collectible: NewCollectible) {
  const { data, error } = await supabase
    .from('collectibles')
    .insert([collectible])
    .select(`
      *,
      collections (
        id,
        name
      )
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function updateCollectible(id: string, collectible: Partial<NewCollectible>) {
  const { data, error } = await supabase
    .from('collectibles')
    .update(collectible)
    .eq('id', id)
    .select(`
      *,
      collections (
        id,
        name
      )
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCollectible(id: string) {
  const { error } = await supabase
    .from('collectibles')
    .delete()
    .eq('id', id);

  if (error) throw error;
}