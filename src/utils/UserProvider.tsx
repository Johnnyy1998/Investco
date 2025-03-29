import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import useStore from "../store";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    // Načti aktuální session při načtení aplikace
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Sleduj změny přihlášení/odhlášení
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [setUser]);

  return <>{children}</>;
}
