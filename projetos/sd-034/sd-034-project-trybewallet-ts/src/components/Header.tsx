import { useSelector } from 'react-redux';
import { RootState } from '../types';

function Header() {
  const email = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);

  return (
    <div>
      <p data-testid="email-field">
        { email }
      </p>
      <p data-testid="total-field">
        { expenses
          .reduce((total, { exchangeRates, value, currency }) => (
            total + Number(value) * Number(exchangeRates[currency].ask)), 0)
          .toFixed(2) }
      </p>
      <p data-testid="header-currency-field">
        BRL
      </p>
    </div>
  );
}

export default Header;
