import { supabase } from "../../supabaseClient";

export async function handleLogin(
  e: React.FormEvent<HTMLFormElement>,
  {
    setError,
    onSuccess, // optional: např. navigate
  }: {
    setError: (msg: string | null) => void;
    onSuccess?: () => void;
  }
) {
  const formData = new FormData(e.target as HTMLFormElement);
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    setError("Email or password is missing");
    return;
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    //console.log(data);
    if (error) {
      setError("Wrong username or password");
    } else {
      setError(null);
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (err) {
    setError("Connection to DB failed");
  }
}

export async function handleSignUp(
  e: React.FormEvent<HTMLFormElement>,
  {
    setError,
    onSuccess, // optional: např. navigate
  }: {
    setError: (msg: string | null) => void;
    onSuccess?: () => void;
  }
) {
  const formData = new FormData(e.target as HTMLFormElement);
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // Basic validations
  if (!email || !email.includes("@")) {
    setError("Invalid email format");
    return;
  }
  if (!password || password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(data);
    if (error) {
      setError("Try it again, sth went wrong");
    } else {
      setError(null);
      if (onSuccess) onSuccess();
    }
  } catch (err) {
    setError("Connection to DB failed");
  }
}
