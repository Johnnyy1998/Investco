import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import useStore from "../store";

function Navbar() {
  const { user } = useStore();
  return (
    <div className="navbar bg-base-100 shadow-sm lg:px-32">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* linky na pages */}
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        {/* link na landing page */}
        <Link to="/" className="btn btn-ghost text-xl">
          INVESTCO
        </Link>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown">
            <div
              tabIndex={1}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-32 p-2 shadow"
            >
              <li>
                <SignOutButton />
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="text-sm">
              Login{" "}
            </Link>
            <p> / </p>
            <Link to="/signup" className="text-sm">
              {" "}
              SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
