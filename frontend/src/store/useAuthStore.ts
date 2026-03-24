import { create } from "zustand";

interface State {
  userId: string;
  email: string;
  role: "AUTHOR" | "READER" | null;
  token: string;
  setInitialized: boolean;
}

interface Action {
  setAuth: (
    userId: string,
    email: string,
    role: "AUTHOR" | "READER",
    token: string,
  ) => void;

  clearAuth: () => void;
}

export const useAuthStore = create<State & Action>((set) => ({
  userId: "",
  email: "",
  role: null,
  token: "",
  setInitialized: false,

  setAuth: (userId, email, role, token) =>
    set({ userId, email, role, token, setInitialized: true }),

  clearAuth: () =>
    set({ userId: "", email: "", role: null, token: "", setInitialized: true }),
}));
