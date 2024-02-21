import { Link } from 'react-router-dom';
import CartItems from '../components/CartItems';
import { CartItemsProps } from '../types';

function Cart({ updateCartCount }: CartItemsProps) {
  return (
    <main>
      <nav>
        <Link to="/">
          <button>Voltar</button>
        </Link>
      </nav>
      <CartItems updateCartCount={ updateCartCount } />
    </main>
  );
}

export default Cart;
