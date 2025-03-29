import { create } from "zustand";
import { User } from "@supabase/supabase-js";

// Define the type for the state
interface StoreState {
  email: string;
  password: string;
  success: boolean;
  error: string | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setSuccess: (value: boolean) => void;
  setError: (message: string | null) => void;
}

// Create the store with the typed state
const useStore = create<StoreState>((set) => ({
  email: "",
  password: "",
  success: false,
  error: null, // Initializing error as null
  user: null,
  setUser: (user) => set({ user }),
  setSuccess: (value) => set({ success: value }),
  setError: (message) => set({ error: message }),
}));

export default useStore;
