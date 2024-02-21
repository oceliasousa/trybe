import { useLocation } from 'react-router-dom';
import Meals from '../Components/Meals';
import Drinks from '../Components/Drinks';

function Recipes() {
  const { pathname } = useLocation();

  if (pathname === '/meals') return <Meals />;
  if (pathname === '/drinks') return <Drinks />;
}

export default Recipes;
