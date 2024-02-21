import {
  DoneRecipeType,
  FavoriteRecipeType,
  InProgressRecipeType,
  RecipeType,
} from '../types';

export function getDoneRecipes() {
  return JSON.parse(localStorage.getItem('doneRecipes') || '[]') as DoneRecipeType[];
}

export function getInProgressRecipes() {
  return JSON.parse(localStorage
    .getItem('inProgressRecipes') || '{"meals":{},"drinks":{}}') as InProgressRecipeType;
}

export function getFavoriteRecipes() {
  return JSON.parse(localStorage
    .getItem('favoriteRecipes') || '[]') as FavoriteRecipeType[];
}

export function isFavorited(recipe: RecipeType) {
  return getFavoriteRecipes()
    .some((favorited) => favorited.id === (
      'idMeal' in recipe ? recipe.idMeal : recipe.idDrink
    ));
}

export function addToFavorites(recipe: RecipeType) {
  let favorites = getFavoriteRecipes();

  if (isFavorited(recipe)) {
    favorites = filterFavorite(favorites, recipe);
  } else {
    favorites.push(buildFavorite(recipe));
  }

  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
}

function filterFavorite(favorites: FavoriteRecipeType[], recipe: RecipeType) {
  return favorites.filter((favorite) => favorite.id !== (
    'idMeal' in recipe ? recipe.idMeal : recipe.idDrink
  ));
}

function buildFavorite(recipe: RecipeType) {
  return {
    id: 'idMeal' in recipe ? recipe.idMeal : recipe.idDrink,
    type: 'idMeal' in recipe ? 'meal' : 'drink',
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: 'idMeal' in recipe ? '' : recipe.strAlcoholic,
    name: 'idMeal' in recipe ? recipe.strMeal : recipe.strDrink,
    image: 'idMeal' in recipe ? recipe.strMealThumb : recipe.strDrinkThumb,
  } as FavoriteRecipeType;
}
