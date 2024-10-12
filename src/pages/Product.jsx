import Hero from "../components/Hero";
import Filters from "../components/Filters";
import Button from "../components/Button";

import BeerImage from "../assets/products/beer.svg";
import WineImage from "../assets/products/wine.svg";
import AlcoholImage from "../assets/products/alcohol.svg";
import SoftDrinkImage from "../assets/products/soft-drink.svg";
import HotDrinkImage from "../assets/products/hot-drink.svg";
import QuantitySelector from "../components/QuantitySelector";

const ProductPage = () => {
  return (
    <section className="product-page">
      <Hero />
      <div className="product-page_content-container">
        <Filters />
        <div className="product-container">
          <div className="product_image">
            <img src={BeerImage} alt="Bière" height={150} width={150} />
          </div>
          <div className="product-details">
            <h2 className="product-details_name">West Coast IPA</h2>
            <h3 className="product-details_category">Bières - IPA</h3>
            <p className="product-details_description">
              Bière aggressivement houblonnée au Nelson Sauvin, Motueka et
              Riwaka. <br />
              7.2% <br />
              44cL
            </p>
            <p className="product-details_price">6,30 €</p>
            <p className="product-details_in-stock">En stock</p>
            <p className="product-details_out-of-stock">Rupture de stock</p>
            <div className="product-details_add-to-cart-container">
              <QuantitySelector />
              <Button
                buttonText="Ajouter au panier"
                className="product-details_add-to-cart_button"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
