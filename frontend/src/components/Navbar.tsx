import React, { useEffect, useState } from "react";
import { Menu, User } from "./icons";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../Api/useUser";
import { MENULIST } from "../const";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isUserMenu, setIsUserMenu] = useState<boolean>(false);

  //list to page change with useEffect in react router
  useEffect(() => {
    setIsOpenMenu(false);
    setIsUserMenu(false);
  }, [location]);

  return (
    <nav className="bg-white-2x dark:bg-black">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <ThemeSwitcher />

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black">
            {MENULIST.slice(0, 3).map((item) => (
              <li key={item.id}>
                <Link
                  key={item.id}
                  to={item.url}
                  className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-black md:p-0 md:dark:text-white"
                  aria-current="page"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          T
        </div>
        <div className="flex items-center ml-10 md:ml-0">
          <Logo />
        </div>
        <div className="flex items-center md:order-2">
          {user ? (
            <button
              type="button"
              className="mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-expanded="false"
              onClick={() => setIsUserMenu(!isUserMenu)}
            >
              <span className="sr-only">Open user menu</span>
              <User />
            </button>
          ) : (
            <Link
              className="px-5 py-1.5 text-sm font-medium text-center text-black border rounded-lg border-red-1x hover:bg-red-1x hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-1x"
              to="/login"
            >
              Login
            </Link>
          )}

          {/* <!-- Dropdown menu --> */}
          <div
            className={`absolute right-4 2xl:right-80 z-50 w-48 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 top-10 ring-1 ring-black ring-opacity-5 focus:outline-none ${
              isUserMenu ? "" : "hidden"
            }`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {user?.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link
                      to="/newsfeed"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      My NewsFeed
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded="false"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu />
          </button>
        </div>

        {/* Menu list */}
        <div
          className={`absolute right-4 2xl:right-80 z-50 w-48 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-black top-10 ring-1 ring-black ring-opacity-5 focus:outline-none ${
            isOpenMenu ? "" : "hidden"
          }`}
          id="user-dropdown"
        >
          <ul className="py-2" aria-labelledby="user-menu-button">
            {MENULIST.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.url}
                  className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-black md:p-0 md:dark:text-white"
                  aria-current="page"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white-2x dark:bg-black md:dark:bg-black ">
            {MENULIST.slice(3, 6).map((item) => (
              <li key={item.id}>
                <Link
                  to={item.url}
                  className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-black md:p-0 md:dark:text-white"
                  aria-current="page"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
