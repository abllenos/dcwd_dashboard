import { create } from 'zustand';

export interface DashboardUIState {
  editMode: boolean;
  toggleEdit: () => void;
  setEdit: (value: boolean) => void;
}

export const useDashboardStore = create<DashboardUIState>((set) => ({
  editMode: false,
  toggleEdit: () => set((s) => ({ editMode: !s.editMode })),
  setEdit: (value) => set({ editMode: value }),
}));
