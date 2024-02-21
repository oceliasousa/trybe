import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMeals, getMealsCategories, getMealsbyCategories } from '../services/api';
import { DrinksType, MealsType } from '../types';
import Footer from '../pages/Footer';
import Header from './Header';

function Meals() {
  const [mealData, setMealData] = useState<MealsType[]>([]);
  const [mealDataList, setMealDataList] = useState<MealsType[]>([]);
  const [mealCategory, setMealCategory] = useState<MealsType[]>([]);
  const [lastCategory, setLastCategory] = useState('');

  type State = {
    meals:{ meals:MealsType[] },
    drinks: { drinks: DrinksType[] }
  };

  const meals = useSelector((state:State) => state.meals.meals);

  useEffect(() => {
    if (meals && meals.length !== 0) {
      setMealDataList(meals);
    }
  }, [meals]);

  useEffect(() => {
    const requestMeals = async () => {
      const mealsData = await getMeals();
      const categoryData = await getMealsCategories();
      const mealDataSave = mealsData.slice(0, 12);
      setMealData(mealDataSave);
      setMealDataList(mealDataSave);
      setMealCategory(categoryData.slice(0, 5));
    };

    requestMeals();
  }, []);

  const allButtonClick = () => {
    setMealDataList(mealData);
  };

  const handleCategoryClick = async (id: string) => {
    if (lastCategory === id) {
      allButtonClick();
      setLastCategory('');
    } else {
      const newMealsList = await getMealsbyCategories(id);
      setMealDataList(newMealsList.slice(0, 12));
      setLastCategory(id);
    }
  };

  return (
    <>
      <Header pageTittle="Meals" />
      <button
        data-testid="All-category-filter"
        onClick={ allButtonClick }
      >
        All
      </button>
      {mealCategory.map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => handleCategoryClick(category.strCategory) }
        >
          { category.strCategory }
        </button>
      ))}
      {mealDataList.map((meal, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ `/meals/${meal.idMeal}` }>
            <span data-testid={ `${index}-card-name` }>
              { meal.strMeal }
            </span>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </Link>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default Meals;
