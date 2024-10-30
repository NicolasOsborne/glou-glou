import HeroIllustration from "../assets/images/hero-2.jpg";

const Hero = () => {
  return (
    <div className="hero">
      <img
        src={HeroIllustration}
        alt="Hero illustration"
        className="hero_image"
        height={250}
        width={1440}
        loading="lazy"
      />
    </div>
  );
};

export default Hero;
