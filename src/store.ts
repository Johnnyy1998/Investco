import { create } from "zustand";
import { User } from "@supabase/supabase-js";

// Define the type for the state
interface StoreState {
  error: string | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setError: (message: string | null) => void;
}

// Create the store with the typed state
const useStore = create<StoreState>((set) => ({
  error: null,
  user: null,
  setUser: (user) => set({ user }),
  setError: (message) => set({ error: message }),
}));

export default useStore;
