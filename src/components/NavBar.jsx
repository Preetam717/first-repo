import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav>
    <NavLink
      to="/home"
      style={({ isActive }) => ({
        fontWeight: isActive ? "bold" : "normal",
      })}
    >
      Home
    </NavLink>

    {" | "}

    <NavLink
      to="/products"
      style={({ isActive }) => ({
        fontWeight: isActive ? "bold" : "normal",
      })}
    >
      Products
    </NavLink>

    {" | "}

    <NavLink
      to="/weather"
      style={({ isActive }) => ({
        fontWeight: isActive ? "bold" : "normal",
      })}
    >
      Weather
    </NavLink>
  </nav>
);

export default Navbar;
