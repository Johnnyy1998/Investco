import { Link, useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/Actions/UserAuthentication";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>();

  return (
    <div className="grid place-items-center mt-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(e, {
            setError,
            onSuccess: () => navigate("/"),
          });
        }}
        className="card w-96 p-8 bg-base-100 shadow-lg gap-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          className="mt-6 p-3 input input-bordered"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="mt-6 p-3 input input-bordered"
        />
        <button type="submit" className="mt-6 btn-primary">
          Sign In
        </button>

        {error ? <p className="text-center text-red-500">{error}</p> : <></>}
      </form>
      <p className="text-center mt-3">
        <Link to="/signup">Click for sign up!</Link>
      </p>
    </div>
  );
}

export default Login;
