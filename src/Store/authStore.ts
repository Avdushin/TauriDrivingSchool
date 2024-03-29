//@ts-nocheck
import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/tauri';

export interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
  phone?: String | null;
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
  updateUser: (
    username: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<boolean>;
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
      // Добавляем проверку на null
      if (!storedUserData) {
        console.error('No user data found in LocalStorage');
        return { success: false, error: 'No user data found' };
      }

      // Переносим деструктуризацию внутрь блока try, чтобы перехватить возможные ошибки
      const { id, role } = JSON.parse(storedUserData);
      if (!id || !role) {
        console.error('Incomplete user data');
        return { success: false, error: 'Incomplete user data' };
      }

      const source = `${role}s`;
      const userData: UserData = await invoke('fetch_user_data', {
        userId: id,
        source,
      });
      if (!userData) {
        console.error('Failed to fetch user data');
        return { success: false, error: 'Failed to fetch user data' };
      }

      userData.source = source;
      get().setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return { success: false, error: 'Failed to fetch user data' };
    }
  },

  updateUser: async (username, email, phone, password) => {
    try {
      const user = get().user;
      if (!user) throw new Error('User data is missing');

      // Добавляем передачу свойства role
      console.log('Updating user data with:', {
        id: user.id,
        username,
        email,
        phone,
        password,
        role: user.role,
      });

      const updatedUser = await invoke('update_user_data', {
        id: user.id,
        username,
        email,
        phone,
        password,
        role: user.role,
      });

      console.log('Updated user data:', updatedUser);

      if (updatedUser) {
        get().setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
      } else {
        console.error('Failed to update user data');
        return false;
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
      console.log('logouted');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useAuthStore;
