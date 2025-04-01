import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

function SignOutButton() {
  const navigate = useNavigate();
  const { setError, user } = useStore();

  const handleSignOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      setError("Not able to sign out");
      return;
    }
    navigate("/login");
  };

  return <>{user ? <button onClick={handleSignOut}>SignOut</button> : <></>}</>;
}

export default SignOutButton;
