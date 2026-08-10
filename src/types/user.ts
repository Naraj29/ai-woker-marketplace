export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  githubId: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}