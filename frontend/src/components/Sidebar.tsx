import { Link, NavLink } from "react-router-dom";

import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'

import reactLogo from '../assets/react.svg'

function Sidebar() {
  return (
    <div className="drawer-side  z-30  ">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <li className="mb-2 font-semibold text-xl">
          <Link to={"/"}>
            <img
              className="mask mask-squircle w-12 bg-cover"
              src={reactLogo}
              alt="Data Sciencie Logo"
            />
            MiTienda
          </Link>{" "}
        </li>
        <li className="">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${isActive ? "font-semibold  bg-base-200 " : "font-normal"}`
            }
          >
            <Squares2X2Icon className="h-6 w-6" /> Dashboard
            {location.pathname === "/" ? (
              <span
                className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                aria-hidden="true"
              ></span>
            ) : null}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
