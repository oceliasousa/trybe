import CartItems from './CartItems';
import { SideCartProps } from '../types';
import '../css/SideCart.css';

function SideCart({ showCart, updateCartCount }: SideCartProps) {
  return (
    <div className="sideCart" hidden={ !showCart }>
      <p>minha cesta</p>
      <CartItems updateCartCount={ updateCartCount } />
    </div>
  );
}

export default SideCart;
