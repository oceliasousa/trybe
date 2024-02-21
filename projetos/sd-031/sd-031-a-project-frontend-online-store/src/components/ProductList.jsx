import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/ProductInCart.css';

export default class ProductList extends Component {
  verifyInCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const findProduct = cart.some(({ id }) => productId === id);
    if (findProduct) return 'product-in-cart';
    return '';
  };

  render() {
    const { productList, handleAddInCart, sort } = this.props;

    if (sort === 'price_asc') productList.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') {
      productList.sort((a, b) => a.price - b.price).reverse();
    }

    return (
      <div className="product-list-container">
        {
          productList.map((product) => (
            <div
              key={ product.id }
              className={ this.verifyInCart(product.id) }
              data-testid="product"
            >
              <Link to={ `/product/${product.id}` } data-testid="product-detail-link">
                <img src={ product.thumbnail } alt={ product.title } />
                <h4>{product.title}</h4>
                <p>{product.price}</p>
                {product.shipping.free_shipping
                  && <p data-testid="free-shipping">Frete grátis</p>}
              </Link>
              <button
                data-testid="product-add-to-cart"
                onClick={ () => handleAddInCart(product) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  handleAddInCart: PropTypes.func,
  sort: PropTypes.string.isRequired,
};

ProductList.defaultProps = {
  handleAddInCart: () => { },
};
