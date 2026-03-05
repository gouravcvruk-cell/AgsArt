import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const navClass = ({ isActive }) =>
  `transition ${isActive ? "text-champagne" : "text-softBlack hover:text-roseGold"}`;

function Navbar() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-roseGold/20 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="font-heading text-3xl font-semibold tracking-wide text-roseGold">
          AuraArt
        </Link>
        <nav className="flex items-center gap-5 text-sm md:text-base">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
          <NavLink to="/cart" className={navClass}>
            Cart ({count})
          </NavLink>
          <NavLink to="/admin" className={navClass}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
