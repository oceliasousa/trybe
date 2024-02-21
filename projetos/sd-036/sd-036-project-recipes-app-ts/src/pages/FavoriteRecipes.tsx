import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { FavoriteRecipeType } from '../types';
import { getFavoriteRecipes } from '../services/localstorage';
import './FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favRecipeData, setFavRecipeData] = useState<FavoriteRecipeType[]>([]);
  const [favRecipeList, setFavRecipeList] = useState<FavoriteRecipeType[]>([]);
  const [mealFavData, setMealFavData] = useState<FavoriteRecipeType[]>([]);
  const [drinkFavData, setDrinkFavData] = useState<FavoriteRecipeType[]>([]);
  const [msgTriggerIndex, setMsgTriggerIndex] = useState<number>();

  useEffect(() => {
    setFavRecipeData(getFavoriteRecipes());
    setFavRecipeList(getFavoriteRecipes());
  }, []);

  useEffect(() => {
    favRecipeData.forEach((recipe) => {
      if (recipe.type === 'meal') {
        setMealFavData((recipeData) => [
          ...recipeData,
          recipe,
        ]);
      } else {
        setDrinkFavData((recipeData) => [
          ...recipeData,
          recipe,
        ]);
      }
    });
  }, [favRecipeData]);

  const handleFilterClick = (type: string) => {
    switch (type) {
      case 'meal':
        setFavRecipeList(mealFavData);
        break;
      case 'drink':
        setFavRecipeList(drinkFavData);
        break;
      default:
        setFavRecipeList(favRecipeData);
        break;
    }
  };

  const unfavButtonClick = (id: string) => {
    const newFavList: FavoriteRecipeType[] = [];
    favRecipeData.forEach((recipe) => {
      if (recipe.id !== id) newFavList.push(recipe);
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
    setFavRecipeData(getFavoriteRecipes());
    setFavRecipeList(getFavoriteRecipes());
  };

  const shareButton = (id: string, type: string, index: number) => {
    const url = window.location.href;
    const newurl = `${url.slice(0, url.length - 16)}${type}s/${id}`;
    navigator.clipboard.writeText(newurl);
    if (msgTriggerIndex !== undefined) {
      document.getElementById(`${msgTriggerIndex}-msg-el`)?.classList.add('d-none');
    }
    document.getElementById(`${index}-msg-el`)?.classList.remove('d-none');
    setMsgTriggerIndex(index);
  };

  return (
    <>
      <Header pageTittle="Favorite Recipes" />
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
      {favRecipeList.map((recipe, index) => (
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
          <button onClick={ () => shareButton(recipe.id, recipe.type, index) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src="/src/images/shareIcon.svg"
              alt="Share recipe"
            />
          </button>
          <button onClick={ () => unfavButtonClick(recipe.id) }>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src="/src/images/blackHeartIcon.svg"
              alt="Favorite recipe"
            />
          </button>
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

export default FavoriteRecipes;
