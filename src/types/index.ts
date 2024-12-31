export interface Collectible {
  id: string;
  name: string;
  description: string;
  acquisitionDate: string;
  estimated_value: number;
  condition: ConditionRating;
  imageUrl?: string;
  groupId?: string;
  userId: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface PriceRange {
  min: number;
  max: number | null;
  label: string;
}

export type ConditionRating = 'mint' | 'near_mint' | 'excellent' | 'good' | 'fair' | 'poor';