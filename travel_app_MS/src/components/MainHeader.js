import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import { Button } from "react-bootstrap";
import { useState } from "react";

const MainHeader = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);

  return (
    <div>
      <header className={classes.header}>
        <nav>
          <ul className={classes.desktop}>
            <li>
              <NavLink activeClassName={classes.active} to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/airlines">
                Flights
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/buses">
                Bus
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/booking">
                Rooms
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={classes.active} to="/rentals">
                Rent-a-car
              </NavLink>
            </li>
            <li className={classes.last}>
              <NavLink activeClassName={classes.active} to="/favorites">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </NavLink>
            </li>
          </ul>
          <ul className={classes.mobile}>
            <li>
              <div className={classes.title}>Travel App</div>
            </li>
            <li>
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => {
                  setOpenMobileNav(!openMobileNav);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      {openMobileNav && (
        <header className={classes.header2}>
          <nav>
            <ul className={classes.mobileOpen}>
              <li>
                <NavLink
                  activeClassName={classes.active}
                  to="/"
                  exact
                  onClick={() => {
                    setOpenMobileNav(!openMobileNav);
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName={classes.active}
                  to="/airlines"
                  onClick={() => {
                    setOpenMobileNav(!openMobileNav);
                  }}
                >
                  Flights
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName={classes.active}
                  to="/buses"
                  onClick={() => {
                    setOpenMobileNav(!openMobileNav);
                  }}
                >
                  Bus
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName={classes.active}
                  to="/booking"
                  onClick={() => {
                    setOpenMobileNav(!openMobileNav);
                  }}
                >
                  Rooms
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName={classes.active}
                  to="/rentals"
                  onClick={() => {
                    setOpenMobileNav(!openMobileNav);
                  }}
                >
                  Rent-a-car
                </NavLink>
              </li>
              <li className={classes.last2}>
                <NavLink
                  activeClassName={classes.active}
                  to="/favorites"
                  onClick={() => {
                    setOpenMobileNav(!openMobileNav);
                  }}
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </div>
  );
};

export default MainHeader;
