import { Link, NavLink } from "react-router-dom";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import CategoriesNav from "./CategoriesNav";
import Logo from "../assets/logos/logo-header.svg";
import MobileLogo from "../assets/logos/logo-mobile.svg";

const Header = () => {
  return (
    <>
      <header>
        <Link to="/" className="header-logo">
          <img
            src={Logo}
            alt="Logo Glou & Glou"
            height={70}
            width={260}
            className="desktop-logo"
          />
          <img
            src={MobileLogo}
            alt="Logo Glou & Glou"
            height={60}
            width={48}
            className="mobile-logo"
          />
        </Link>
        <nav className="header-nav">
          <NavLink to="/login" className="header-nav_login">
            <FaRegUser />
            Connexion
          </NavLink>
          <NavLink to="/cart" className="header-nav_cart">
            <FaShoppingCart />
            Panier (0)
          </NavLink>
        </nav>
      </header>
      <CategoriesNav />
    </>
  );
};

export default Header;
