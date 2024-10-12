import Filters from "../components/Filters";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <section className="homepage">
      <Hero />
      <div className="homepage-content-container">
        <Filters />
        <ProductList />
      </div>
    </section>
  );
};

export default Home;
