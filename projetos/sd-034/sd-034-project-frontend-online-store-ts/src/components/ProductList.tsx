import { Link } from 'react-router-dom';
import '../css/ProductList.css';
import { ProductListProps } from '../types';

function ProductList({ productList, handleAddInCart }: ProductListProps) {
  return (
    <section>
      {
        productList.map((product) => (
          <div
            className="product"
            key={ product.id }
            data-testid="product"
          >
            {product.shipping.free_shipping
              && <p
                className="free-shipping"
                data-testid="free-shipping"
              >
                Frete grátis
              </p>}
            <Link
              className={ !product.shipping.free_shipping
                ? 'free-shipping-placeholder' : '' }
              data-testid="product-detail-link"
              to={ `/product/${product.id}` }
            >
              <img src={ product.thumbnail } alt={ product.title } />
              <h4>{product.title}</h4>
            </Link>
            <div className="price-and-button">
              <p>
                R$
                {' '}
                {product.price}
              </p>

              <button
                data-testid="product-add-to-cart"
                onClick={ () => handleAddInCart(product) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        ))
      }
    </section>
  );
}

export default ProductList;
