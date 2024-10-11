import { FaChevronRight } from "react-icons/fa6";

const Filters = () => {
  return (
    <aside className="filters-card">
      <div className="filters-categories">
        <h3 className="filters-categories_title">Catégories</h3>
        <div className="filters-categories_list">
          <div className="filters-category">
            <FaChevronRight className="filters-category_chevron" />
            <a className="filters-category_name" href="/products/:categoryId">
              Bières
            </a>
          </div>
          <div className="filters-category">
            <FaChevronRight className="filters-category_chevron" />
            <a className="filters-category_name" href="/products/:categoryId">
              Vins
            </a>
          </div>
          <div className="filters-category">
            <FaChevronRight className="filters-category_chevron" />
            <a className="filters-category_name" href="/products/:categoryId">
              Spiritueux
            </a>
          </div>
          <div className="filters-category">
            <FaChevronRight className="filters-category_chevron" />
            <a className="filters-category_name" href="/products/:categoryId">
              Sans Alcool
            </a>
          </div>
          <div className="filters-category">
            <FaChevronRight className="filters-category_chevron" />
            <a className="filters-category_name" href="/products/:categoryId">
              Boissons Chaudes
            </a>
          </div>
          <div className="filters-category">
            <FaChevronRight className="filters-category_chevron" />
            <a className="filters-category_name" href="/products/:categoryId">
              Nouveautés
            </a>
          </div>
          <div className="filters-category">
            <FaChevronRight className="filters-category_chevron" />
            <a className="filters-category_name" href="/products/:categoryId">
              Promotions
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
