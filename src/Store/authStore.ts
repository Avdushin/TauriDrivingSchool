import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/tauri';

export interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
  source: string;
  group_id?: number | null;
  group_name?: string | null;
}

export interface AuthStoreState {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  fetchAndSetUserData: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
    }
  },
  login: async (email, password) => {
    try {
      const result: UserData = await invoke('authenticate_user', {
        email,
        password,
      });
      get().setUser(result);
      return { success: true };
    } catch (error) {
      console.error(`Login error: ${error}`);
      return { success: false, error: 'Failed to login' };
    }
  },
  fetchAndSetUserData: async () => {
    try {
      const storedUserData = localStorage.getItem('user');
      if (!storedUserData)
        throw new Error('No user data found in LocalStorage');

      const { id, role } = JSON.parse(storedUserData);
      const source = role + 's';
      const userData: UserData = await invoke('fetch_user_data', {
        userId: id,
        source,
      });
      userData.source = source;
      get().setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return { success: false, error: 'Failed to fetch user data' };
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
      console.log('logouted');
      window.location.reload();
    } catch (err) {
      console.error(err)
    }
  }

}));

export default useAuthStore;
