import { create } from 'zustand';

export interface SidebarStore {
  activeTab: number | undefined;
  setActiveTab: (index: number) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  activeTab: parseInt(localStorage.getItem('activeTab') || '0', 10),
  setActiveTab: (index) => {
    localStorage.setItem('activeTab', index.toString());
    set({ activeTab: index });
  },
}));