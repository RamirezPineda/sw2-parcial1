import Bars3Icon  from '@heroicons/react/24/outline/Bars3Icon'
// import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
// import SunIcon from '@heroicons/react/24/outline/SunIcon'
// import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">Dashboard</h1>
        </div>

        <div className="flex-none ">

          {/* Light and dark theme selection toogle **/}
          {/* <label className="swap ">
            <input type="checkbox" />
            <SunIcon
              data-set-theme="light"
              data-act-class="ACTIVECLASS"
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "dark" ? "swap-on" : "swap-off")
              }
            />
            <MoonIcon
              data-set-theme="dark"
              data-act-class="ACTIVECLASS"
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "light" ? "swap-on" : "swap-off")
              }
            />
          </label> */}

          {/* Profile icon, opening menu on click */}
          {/* <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to={"/app/settings-profile"}>
                  Profile Settings
                </Link>
              </li> 
              <li className="">
                <Link to={"/app/settings-billing"}>Bill History</Link>
              </li> 
               <div className="divider mt-0 mb-0"></div>
              <li>
                <a href='' >Logout</a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default Header;
