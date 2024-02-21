import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import { getProductsFromCategoryAndQuery } from './services/api';
import { addToCart } from './services/localStorage';
import './css/App.css';

class App extends Component {
  constructor() {
    super();
    this.updateCartCount = this.updateCartCount.bind(this);
  }

  state = {
    query: '',
    productList: [],
    cartCount: 0,
    noSearch: true,
    sort: '',
  };

  componentDidMount() {
    this.updateCartCount();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  getProducts = async (event) => {
    event.preventDefault();
    const { query } = this.state;
    const categoryId = event.target.type === 'radio' ? event.target.id : '';
    const productList = (await getProductsFromCategoryAndQuery(categoryId, query));
    this.setState({
      productList: productList.results,
      noSearch: false,
      query: '',
    });
  };

  handleAddInCart = (product) => {
    addToCart(product);
    this.updateCartCount();
  };

  updateCartCount() {
    const productsInCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = productsInCart.reduce((sum, product) => sum + product.quantity, 0);
    this.setState({ cartCount });
  }

  render() {
    const {
      query,
      productList,
      productsInCart,
      cartCount,
      noSearch,
      sort,
    } = this.state;
    return (
      <>
        <Header
          cartCount={ cartCount }
          handleChange={ this.handleChange }
          query={ query }
          getProducts={ this.getProducts }
          updateCartCount={ this.updateCartCount }
        />
        <Switch>
          <Route path="/cart">
            <Cart
              productsInCart={ productsInCart }
              updateCartCount={ this.updateCartCount }
            />
          </Route>
          <Route exact path="/">
            <Home
              getProducts={ this.getProducts }
              productList={ productList }
              handleAddInCart={ this.handleAddInCart }
              handleChange={ this.handleChange }
              noSearch={ noSearch }
              sort={ sort }
            />
          </Route>
          <Route
            path="/product/:id"
            render={ (props) => (<Product
              { ...props }
              handleAddInCart={ this.handleAddInCart }
            />) }
          />

          <Route
            path="/Checkout"
            render={ (props) => (<Checkout
              { ...props }
              updateCartCount={ this.updateCartCount }
            />) }
          />
        </Switch>
      </>
    );
  }
}

export default App;
