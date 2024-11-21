export interface Collectible {
  id: string;
  name: string;
  description: string;
  acquisitionDate: string;
  estimatedValue: number;
  condition: 'mint' | 'excellent' | 'good' | 'fair' | 'poor';
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