import Filters from "../components/Filters";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <section className="homepage">
      <Hero />
      <div className="homepage-content-container">
        <Filters />
      </div>
    </section>
  );
};

export default Home;
