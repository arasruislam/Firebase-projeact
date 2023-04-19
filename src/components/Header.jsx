import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then((result) => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            GrowUp
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            { user &&
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            }
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <div>
              {user ? (
                <div className="space-x-2">
                  <Link>
                    <span>{user.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn btn-info text-white"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn btn-warning text-white">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
