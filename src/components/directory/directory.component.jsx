import "./directory.styles.scss";

import { CategoryItem } from "../category-item/category.component";

export const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};
