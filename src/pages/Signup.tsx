import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { handleSignUp } from "../utils/Actions/UserAuthentication";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>();

  return (
    <div className="grid place-items-center mt-10">
      <form
        className="card w-96 p-8 bg-base-100 shadow-lg gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp(e, {
            setError,
            onSuccess: () => navigate("/"),
          });
        }}
      >
        <h2 className="font-bold pb-2">Sign up today!</h2>
        <p>
          Already have an account? <Link to="/login">Sign in!</Link>
        </p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-3 mt-6 input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-3 mt-6 input"
        />
        <button type="submit" className="mt-6 btn-primary w-full">
          Sign up
        </button>

        {error ? <p className="text-center text-red-500">{error}</p> : <></>}
      </form>
    </div>
  );
}

export default Signup;
