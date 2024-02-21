import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDrinks, getDrinksCategories, getDrinksbyCategories } from '../services/api';
import { DrinksType, MealsType } from '../types';
import Footer from '../pages/Footer';
import Header from './Header';

function Drinks() {
  const [drinkData, setDrinkData] = useState<DrinksType[]>([]);
  const [drinkDataList, setDrinkDataList] = useState<DrinksType[]>([]);
  const [drinkCategory, setDrinkCategory] = useState<DrinksType[]>([]);
  const [lastCategory, setLastCategory] = useState('');

  type State = {
    meals:{ meals:MealsType[] },
    drinks: { drinks: DrinksType[] }
  };

  const drinks = useSelector((state:State) => state.drinks.drinks);

  useEffect(() => {
    if (drinks && drinks.length !== 0) {
      setDrinkDataList(drinks);
    }
  }, [drinks]);

  useEffect(() => {
    const requestDrinks = async () => {
      const drinksData = await getDrinks();
      const categoryData = await getDrinksCategories();
      const drinkDataSave = drinksData.slice(0, 12);
      setDrinkData(drinkDataSave);
      setDrinkDataList(drinkDataSave);
      setDrinkCategory(categoryData.slice(0, 5));
    };

    requestDrinks();
  }, []);

  const allButtonClick = () => {
    setDrinkDataList(drinkData);
  };

  const handleCategoryClick = async (id: string) => {
    if (lastCategory === id) {
      allButtonClick();
      setLastCategory('');
    } else {
      const newDrinksList = await getDrinksbyCategories(id);
      setDrinkDataList(newDrinksList.slice(0, 12));
      setLastCategory(id);
    }
  };

  return (
    <>
      <Header pageTittle="Drinks" />
      <button
        data-testid="All-category-filter"
        onClick={ allButtonClick }
      >
        All
      </button>
      {drinkCategory.map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => handleCategoryClick(category.strCategory) }
        >
          { category.strCategory }
        </button>
      ))}
      {drinkDataList.map((drink, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ `/drinks/${drink.idDrink}` }>
            <span data-testid={ `${index}-card-name` }>
              { drink.strDrink }
            </span>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
          </Link>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default Drinks;
