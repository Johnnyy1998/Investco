import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function HomeLayout() {
  return (
    <>
      <Navbar />
      <section className="align-element py-10">
        <Outlet />
      </section>
    </>
  );
}

export default HomeLayout;
