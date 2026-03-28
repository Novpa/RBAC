import { create } from "zustand";

interface State {
  accessToken: string | null;
  user: any;
}

interface Action {
  setAuth: (token: string, user: any) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<State & Action>((set) => ({
  accessToken: null,
  user: null,

  setAuth: (token, user) => set({ accessToken: token, user }),

  clearAuth: () => set({ accessToken: null, user: null }),
}));
