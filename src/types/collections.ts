
export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export type NewCollection = Omit<Collection, 'id' | 'created_at' | 'updated_at' | 'user_id'>;