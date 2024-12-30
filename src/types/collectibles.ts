export interface Collectible {
  id: string;
  name: string;
  description: string | null;
  acquisition_date: string;
  estimated_value: number;
  condition: 'mint' | 'excellent' | 'good' | 'fair' | 'poor';
  image_url: string | null;
  collection_id: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  collections?: {
    id: string;
    name: string;
  } | null;
}

export type NewCollectible = Omit<
  Collectible,
  'id' | 'created_at' | 'updated_at' | 'user_id' | 'groups'
>;