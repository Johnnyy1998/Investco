import { Link } from "react-router-dom";
import landingPicture from "../assets/ladnginPicture.jpg";
import useStore from "../store";
import LandingChart from "../Components/Landing/LandingChart";
function Landing() {
  const { user } = useStore();
  console.log(user);
  return (
    <div>
      <h1 className="text-4xl text-sky-600 font-semibold">
        Track your entire portfolio for free
      </h1>
      <div className="mt-6 grid md:grid-cols-2 grid-cols-1 ">
        <ul className="flex flex-col gap-4 p-3">
          <li>
            <span className="checkmark">✔</span> All your accounts in one place
          </li>
          <li>
            <span className="checkmark">✔</span> Plan for retirement
          </li>
          <li>
            <span className="checkmark">✔</span> Monitor your investments
          </li>
          <li>
            <span className="checkmark">✔</span> Uncover hidden fees
          </li>
        </ul>
        <img src={landingPicture} alt="Landing" className="mt-4" />
      </div>
      <span className="text-xs">For illustrative purposes only</span>
      <p className="mt-2 ">
        Advisory services are provided for a fee by Empower Advisory Group, LLC
        (“EAG”). EAG is a registered investment adviser with the Securities and
        Exchange Commission (“SEC”) and subsidiary of Empower Annuity Insurance
        Company of America. Registration does not imply a certain level of skill
        or training. Investing involves risk. Past performance is not indicative
        of future returns. You may lose money. All visuals are illustrative
        only. Actors are not EAG clients.
      </p>
      {!user && (
        <div className="border-2 mt-4 rounded-lg">
          <button className="w-full">
            <Link to="/login">Start Now!</Link>
          </button>
        </div>
      )}
      <LandingChart />
    </div>
  );
}

export default Landing;
