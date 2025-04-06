import { Link } from "react-router-dom";
import landingPicture from "../assets/ladnginPicture.jpg";
import useStore from "../store";
import LandingChart from "../Components/Landing/LandingChart";
import { UserPlus, Upload, LineChart } from "lucide-react";

function Landing() {
  const { user } = useStore();
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
            <Link to="/signup">Start Now!</Link>
          </button>
        </div>
      )}
      <LandingChart />
      <div className="mt-10 flex flex-col gap-3 sm:flex-row  justify-between ">
        <div className="border-2 w-full text-center p-3 flex flex-col gap-2 rounded-l-xl shadow-lg shadow-blue-500/50">
          <UserPlus className="mx-auto h-8 w-8 text-blue-500" />
          <p className="text-gray-500">1. Step</p>
          <p className="font-semibold text-xl">Sign up</p>
          <Link
            to="/signup"
            className="no-underline font-normal text-gray-500 hover:text-gray-500"
          >
            <p className="">Just click here to sign up</p>
          </Link>
        </div>
        <div className="border-2 w-full text-center p-3 flex flex-col gap-2 shadow-lg shadow-blue-500/50">
          <Upload className="mx-auto h-8 w-8 text-blue-500" />
          <p className="text-gray-500">2. Step</p>
          <p className="font-semibold text-xl">Load data</p>
          <p className="text-gray-500">Easy recording of trades</p>
        </div>
        <div className="border-2 w-full text-center p-3 flex flex-col gap-2 rounded-r-xl shadow-lg shadow-blue-500/50">
          <LineChart className="mx-auto h-8 w-8 text-blue-500" />
          <p className="text-gray-500">3. Step</p>
          <p className="font-semibold text-xl">Perfomance</p>
          <p className="text-gray-500">See Performance of your portfolio</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
