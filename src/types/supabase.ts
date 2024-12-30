export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ConditionRating = 'mint' | 'near_mint' | 'excellent' | 'good' | 'fair' | 'poor';

export type Database = {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Update: {
          id: string
          user_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
      }
      collectibles: {
        Row: {
          id: string;
          collection_id: string | null
          user_id: string
          name: string
          description?: string | null
          condition?: ConditionRating
          acquisition_date?: string | null
          acquisition_price?: number | null
          estimated_value?: number | null
          image_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id: string;
          collection_id: string | null
          user_id: string
          name: string
          description?: string | null
          condition?: ConditionRating
          acquisition_date?: string | null
          acquisition_price?: number | null
          estimated_value?: number | null
          image_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id: string;
          collection_id: string | null
          user_id: string
          name: string
          description?: string | null
          condition?: ConditionRating
          acquisition_date?: string | null
          acquisition_price?: number | null
          estimated_value?: number | null
          image_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      condition_type: 'mint' | 'excellent' | 'good' | 'fair' | 'poor'
    }
  }
}