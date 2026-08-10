// Define User interface locally to avoid import issues
interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  githubId: string;
  createdAt: Date;
}

// Mock authentication for prototype
// In production, this would use real GitHub OAuth

export const authAPI = {
  login: async (username: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      id: `user-${Date.now()}`,
      username,
      email: `${username.toLowerCase()}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      githubId: `github-${username}`,
      createdAt: new Date()
    };
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
  },

  getCurrentUser: async (): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  }
};