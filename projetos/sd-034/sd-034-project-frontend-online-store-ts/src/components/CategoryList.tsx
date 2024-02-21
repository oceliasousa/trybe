import { CategoryListProps } from '../types';

function CategoryList({ categories, handleCategoryChange }: CategoryListProps) {
  return (
    <aside>
      <fieldset>
        { categories.map((category, index) => (
          <div key={ index }>
            <input
              name="category"
              type="radio"
              id={ category.id }
              onChange={ handleCategoryChange }
            />
            <label
              data-testid="category"
              htmlFor={ category.id }
            >
              { category.name }
            </label>
          </div>)) }
      </fieldset>
    </aside>
  );
}

export default CategoryList;
