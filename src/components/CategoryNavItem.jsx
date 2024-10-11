import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa6";

const CategoryNavItem = ({ categoryItemIcon, categoryItemName }) => {
  return (
    <div className="category-item">
      <span className="category-item_icon">{categoryItemIcon}</span>
      <span className="category-item_name">{categoryItemName}</span>
      <FaChevronDown className="category-item_chevron" />
    </div>
  );
};

CategoryNavItem.propTypes = {
  categoryItemIcon: PropTypes.element.isRequired,
  categoryItemName: PropTypes.string.isRequired,
};

export default CategoryNavItem;
