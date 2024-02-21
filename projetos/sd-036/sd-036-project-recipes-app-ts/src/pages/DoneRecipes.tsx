import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { DoneRecipeType } from '../types';
import { getDoneRecipes } from '../services/localstorage';
import './DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipesData, setDoneRecipesData] = useState<DoneRecipeType[]>([]);
  const [doneRecipesList, setDoneRecipesList] = useState<DoneRecipeType[]>([]);
  const [mealDoneData, setMealDoneData] = useState<DoneRecipeType[]>([]);
  const [drinkDoneData, setDrinkDoneData] = useState<DoneRecipeType[]>([]);
  const [msgTriggerIndex, setMsgTriggerIndex] = useState<number>();

  useEffect(() => {
    setDoneRecipesData(getDoneRecipes());
    setDoneRecipesList(getDoneRecipes());
  }, []);

  useEffect(() => {
    doneRecipesData.forEach((recipe) => {
      if (recipe.type === 'meal') {
        setMealDoneData((recipeData) => [
          ...recipeData,
          recipe,
        ]);
      } else {
        setDrinkDoneData((recipeData) => [
          ...recipeData,
          recipe,
        ]);
      }
    });
  }, [doneRecipesData]);

  const handleFilterClick = (type: string) => {
    switch (type) {
      case 'meal':
        setDoneRecipesList(mealDoneData);
        break;
      case 'drink':
        setDoneRecipesList(drinkDoneData);
        break;
      default:
        setDoneRecipesList(doneRecipesData);
        break;
    }
  };

  const shareButton = (id: string, type: string, index: number) => {
    const url = window.location.href;
    const newurl = `${url.slice(0, url.length - 12)}${type}s/${id}`;
    navigator.clipboard.writeText(newurl);
    if (msgTriggerIndex !== undefined) {
      document.getElementById(`${msgTriggerIndex}-msg-el`)?.classList.add('d-none');
    }
    document.getElementById(`${index}-msg-el`)?.classList.remove('d-none');
    setMsgTriggerIndex(index);
  };

  return (
    <>
      <Header pageTittle="Done Recipes" />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilterClick('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilterClick('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterClick('drink') }
      >
        Drinks
      </button>
      {doneRecipesList.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              className="img"
            />
            <h3 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h3>
          </Link>
          {recipe.type === 'meal' ? (
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.nationality} - ${recipe.category}` }
            </span>
          ) : (
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.alcoholicOrNot}` }
            </span>
          )}
          <span data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </span>
          <button onClick={ () => shareButton(recipe.id, recipe.type, index) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src="/src/images/shareIcon.svg"
              alt="Share recipe"
            />
          </button>
          {recipe.tags.map((tag) => (
            <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              { tag }
            </span>
          ))}
          <span
            data-testid={ `${index}-msg-el` }
            id={ `${index}-msg-el` }
            className="d-none"
          >
            Link copied!
          </span>
        </div>
      ))}
    </>
  );
}

export default DoneRecipes;
