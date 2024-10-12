import ProductCard from "./ProductCard";
import BeerImage from "../assets/products/beer.svg";
import WineImage from "../assets/products/wine.svg";
import AlcoholImage from "../assets/products/alcohol.svg";
import SoftDrinkImage from "../assets/products/soft-drink.svg";
import HotDrinkImage from "../assets/products/hot-drink.svg";

const ProductList = () => {
  return (
    <div className="products">
      <h1 className="products-title">Nouveautés</h1>
      <div className="products-container">
        <ProductCard
          productImageSrc={BeerImage}
          productImageAlt="Bière"
          productName="West Coast IPA"
          productCategory="Bières - IPA"
          productPrice={6.3}
        />
        <ProductCard
          productImageSrc={BeerImage}
          productImageAlt="Bière"
          productName="Czech Pilsner"
          productCategory="Bières - Blonde"
          productPrice={4.2}
        />
        <ProductCard
          productImageSrc={WineImage}
          productImageAlt="Vin"
          productName="Syrah"
          productCategory="Vins - rouge"
          productPrice={16.4}
        />
        <ProductCard
          productImageSrc={SoftDrinkImage}
          productImageAlt="Sans alcool"
          productName="Club Mate"
          productCategory="Sans Alcool - Soda"
          productPrice={3.8}
        />
        <ProductCard
          productImageSrc={AlcoholImage}
          productImageAlt="Spiritueux"
          productName="Mezcal"
          productCategory="Spiritueux - Tequila"
          productPrice={18.6}
        />
        <ProductCard
          productImageSrc={HotDrinkImage}
          productImageAlt="Boisson chaude"
          productName="Blue Jamaica"
          productCategory="Boissons Chaudes - Café"
          productPrice={9.2}
        />
      </div>
    </div>
  );
};

export default ProductList;
