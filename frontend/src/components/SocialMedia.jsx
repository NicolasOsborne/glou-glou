import PropTypes from "prop-types";

const SocialMedia = ({ socialMediaSrc, socialMediaAlt }) => {
  return (
    <a className="social-media-icon" href="#">
      <img src={socialMediaSrc} alt={socialMediaAlt} height={32} width={32} />
    </a>
  );
};

SocialMedia.propTypes = {
  socialMediaSrc: PropTypes.string.isRequired,
  socialMediaAlt: PropTypes.string.isRequired,
};

export default SocialMedia;
