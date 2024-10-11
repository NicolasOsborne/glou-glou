import CategoryNavItem from "./CategoryNavItem";

import { LuBeer, LuCoffee, LuCupSoda, LuWine } from "react-icons/lu";
import { LiaCocktailSolid } from "react-icons/lia";

const CategoriesNav = () => {
  return (
    <section className="categories-nav">
      <CategoryNavItem
        categoryItemIcon={<LuBeer />}
        categoryItemName="Bières"
      />
      <CategoryNavItem categoryItemIcon={<LuWine />} categoryItemName="Vins" />
      <CategoryNavItem
        categoryItemIcon={<LiaCocktailSolid />}
        categoryItemName="Spiritueux"
      />
      <CategoryNavItem
        categoryItemIcon={<LuCupSoda />}
        categoryItemName="Sans alcool"
      />
      <CategoryNavItem
        categoryItemIcon={<LuCoffee />}
        categoryItemName="Boissons chaudes"
      />
    </section>
  );
};

export default CategoriesNav;
