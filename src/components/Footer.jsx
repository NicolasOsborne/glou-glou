import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import Untappd from "../assets/icons/untappd.svg";

import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <footer>
      <div className="footer-info">
        <h4 className="footer-name">Glou & Glou</h4>
        <p className="footer-address">
          6 rue Irvoy <br /> 38000 Grenoble
        </p>
      </div>
      <img
        src="/src/assets/logos/logo-footer.svg"
        height={90}
        width={233}
        alt="Logo Glou & Glou"
        className="footer-logo"
      />
      <div className="footer-social">
        <SocialMedia socialMediaSrc={Facebook} socialMediaAlt="Facebook" />
        <SocialMedia socialMediaSrc={Instagram} socialMediaAlt="Instagram" />
        <SocialMedia socialMediaSrc={Untappd} socialMediaAlt="Untappd" />
      </div>
    </footer>
  );
};

export default Footer;
