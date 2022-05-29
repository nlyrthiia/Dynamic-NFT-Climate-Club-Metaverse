import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserCircleIcon, CreditCardIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import clsx from "clsx";

import logo from "../assets/logo.png";
import WalletContext from "../context/WalletContext";

const truncate = (address) => {
  return address && address.slice(0, 4) + "..." + address.slice(-2);
};

const Navbar = () => {
  const { walletInfo, error, handleWalletConnect } = useContext(WalletContext);
  return (
    <header className="w-full h-[100px] sticky top-0 shadow-xl z-10 bg-white">
      <div className="container h-full mx-auto flex items-center justify-between px-10">
        <Link to="/">
          <img src={logo} alt="DCCM LOGO" className="h-full" />
        </Link>
        <nav className="h-full flex items-center justify-between gap-10 font-semibold text-xl text-gray-400">
          <NavLink
            className={({ isActive }) =>
              clsx(
                "hover:text-black",
                isActive &&
                  "text-black before:block before:absolute before:top-[60px] before:w-full before:h-[4px] before:bg-[#73c000] relative inline-block"
              )
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "hover:text-black",
                isActive &&
                  "text-black before:block before:absolute before:top-[60px] before:w-full before:h-[4px] before:bg-[#73c000] relative inline-block"
              )
            }
            to="explore"
          >
            Explore
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "hover:text-black",
                isActive &&
                  "text-black before:block before:absolute before:top-[60px] before:w-full before:h-[4px] before:bg-[#73c000] relative inline-block"
              )
            }
            to="rank"
          >
            Rank
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "hover:text-black",
                isActive &&
                  "text-black before:block before:absolute before:top-[60px] before:w-full before:h-[4px] before:bg-[#73c000] relative inline-block"
              )
            }
            to="mint"
          >
            Mint
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "hover:text-black",
                isActive &&
                  "text-black before:block before:absolute before:top-[60px] before:w-full before:h-[4px] before:bg-[#73c000] relative inline-block"
              )
            }
            to="resources"
          >
            Resources
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                "hover:text-black",
                isActive &&
                  "text-black before:block before:absolute before:top-[60px] before:w-full before:h-[4px] before:bg-[#73c000] relative inline-block"
              )
            }
            to="account"
          >
            {walletInfo.address ? (
              <UserIcon className="text-blue-500 h-8 w-8" />
            ) : (
              <UserCircleIcon className="h-8 w-8" />
            )}
          </NavLink>
          {!error && walletInfo.address ? (
            <div className="text-black">{truncate(walletInfo.address)}</div>
          ) : (
            <button onClick={handleWalletConnect}>
              <CreditCardIcon className="h-8 w-8" />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
