import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import {
  FaUserCircle,
  FaCog,
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

const AdminNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [newOrderNotification, setNewOrderNotification] = useState(false);
  const [sound, setSound] = useState(null); // Initialize sound state

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const user = auth.currentUser;

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Load the sound file
    const audio = new Audio("/notification_sound.mp3"); // Place your sound file in the public folder
    setSound(audio);
    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const ordersCollectionRef = collection(db, "orders");
    const q = query(ordersCollectionRef, where("status", "!=", "complete"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const hasNewOrder = snapshot.docs.some(
          (doc) => doc.metadata.hasPendingWrites === false
        );

        if (hasNewOrder) {
          setNewOrderNotification(true);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (newOrderNotification && sound) {
      sound.play();
      const timer = setTimeout(() => {
        setNewOrderNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [newOrderNotification, sound]);

  return (
    <nav className="bg-primary-light shadow-lg z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        {/* Logo/Brand */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-bold text-neutral-light whitespace-nowrap font-poppins text-shadow">
            WCU A+ Lounge Service
          </span>
        </Link>

        {/* Right Section: Notification, Profile, and Mobile Menu Button */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Notification Button */}
          <button
            type="button"
            className="p-2 text-neutral-light hover:text-white relative focus:outline-none"
            onClick={() => setNewOrderNotification(false)} // Reset on click
          >
            <FontAwesomeIcon
              icon={newOrderNotification ? faBell : faBellSlash}
              className="w-6 h-6 text-neutral-light"
            />
            {newOrderNotification && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-accent-DEFAULT rounded-full">
                !
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex text-sm bg-secondary-DEFAULT rounded-full focus:ring-4 focus:ring-secondary-light"
              id="user-menu-button"
              aria-expanded={profileOpen}
              onClick={toggleProfile}
            >
              <span className="sr-only">Open user menu</span>
              <FaUserCircle className="w-8 h-8 text-neutral-light" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-neutral-light rounded-lg shadow-lg z-10"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-neutral-dark">
                    Welcome
                  </p>
                  <p className="text-sm font-medium text-neutral-DEFAULT truncate">
                    {user?.email || "User Email"}
                  </p>
                </div>
                <ul className="py-2">
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light"
                    >
                      <FaTachometerAlt className="mr-2" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light"
                    >
                      <FaCog className="mr-2" /> Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-neutral-dark hover:bg-primary-light"
                    >
                      <FaSignOutAlt className="mr-2" /> Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral-light rounded-lg md:hidden hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-secondary-light"
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Main Navigation Links */}
        <div
          className={`items-center justify-between ${
            menuOpen ? "block" : "hidden"
          } w-full bg-primary-dark rounded-md px-3 md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-1 md:px-1 mt-1 border border-neutral-DEFAULT rounded-lg bg-neutral-light md:space-x-10 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                to="/admin/MenuSection"
                className="flex items-center rounded-md px-4 py-2 text-sm text-neutral-light hover:bg-primary-light hover:text-white transition-colors"
                aria-current="page"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/admin/OrderSection"
                className="flex items-center rounded-md px-4 py-2 text-sm text-neutral-light hover:bg-primary-light hover:text-white transition-colors"
                aria-current="page"
              >
                Order
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
