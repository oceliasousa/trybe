import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import { ProductType } from './types';
import { addToCart } from './services/localStorage';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import './index.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
  }, []);

  const handleAddInCart = (product: ProductType) => {
    addToCart(product);
    updateCartCount();
  };

  const updateCartCount = () => {
    const productsInCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCartCount = productsInCart
      .reduce((sum: number, product: ProductType) => sum + (product.quantity || 0), 0);
    setCartCount(newCartCount);
  };

  return (
    <>
      <Header updateCartCount={ updateCartCount } cartCount={ cartCount } />

      <Routes>
        <Route
          path="/"
          element={ <Home handleAddInCart={ handleAddInCart } cartCount={ cartCount } /> }
        />
        <Route
          path="/cart"
          element={ <Cart updateCartCount={ updateCartCount } /> }
        />
        <Route
          path="/product/:productId"
          element={ <Product
            handleAddInCart={ handleAddInCart }
            cartCount={ cartCount }
          /> }
        />
        <Route
          path="/checkout"
          element={ <Checkout updateCartCount={ updateCartCount } /> }
        />
      </Routes>
    </>
  );
}

export default App;
