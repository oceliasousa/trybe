import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';
import { CategoryType, ProductType, HomeProps } from '../types';
import ProductList from '../components/ProductList';

function Home({ handleAddInCart, cartCount }: HomeProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [productList, setProductList] = useState<ProductType[]>([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getCategories().then((response) => setCategories(response));

    const query = searchParams.get('query');
    if (query) {
      const searchInput = document.getElementById('query') as HTMLInputElement;
      if (searchInput) {
        searchInput.value = query;
        getProducts();
      }
    }
  }, [searchParams]);

  const getProducts = () => {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    const query = searchInput ? searchInput.value : '';

    const categoryInput = document.querySelector('input[name="category"]:checked');
    const categoryId = categoryInput ? categoryInput.id : '';

    getProductsFromCategoryAndQuery(categoryId, query).then((response) => {
      setProductList(response.results);
    });
  };

  const handleCategoryChange = () => {
    getProducts();
  };

  return (
    <main>
      <Link to="/cart" data-testid="shopping-cart-button">
        (
        <span className="span" data-testid="shopping-cart-size">{cartCount}</span>
        )
      </Link>
      <p data-testid="home-initial-message" />
      <CategoryList
        categories={ categories }
        handleCategoryChange={ handleCategoryChange }
      />
      <ProductList productList={ productList } handleAddInCart={ handleAddInCart } />
    </main>
  );
}

export default Home;
