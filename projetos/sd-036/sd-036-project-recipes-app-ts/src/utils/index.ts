import { DrinksType, MealsType } from '../types';

export const favorites = () => JSON
  .parse(localStorage.getItem('favoriteRecipes') as string) || [];

export const favoritesOrNot = (
  id: string,
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>,
  favoriteRecipe: { [key: string]: string }[],
) => {
  const isFavorite = favorites().find((favorite: { id: string }) => favorite.id === id);
  if (isFavorite) {
    const removeFavorite = favorites()
      .filter((favorite: { id: string }) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
  } else {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favorites(), ...favoriteRecipe]));
  }
  setIsFavorite((prevState) => !prevState);
};

export const teste = (
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>,
  id: string,
) => {
  const isFavorite = favorites().find((favorite: { id: string }) => favorite.id === id);
  if (isFavorite) {
    setIsFavorite(true);
  }
};

interface Ingredient {
  ingredient: string;
  measurement: string;
}

export const ingredientsRecipes = (recipe: MealsType | DrinksType, setIngredients:
React.Dispatch<React.SetStateAction<Ingredient[]>>) => {
  const newIngredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    const ingredient = recipe?.[ingredientKey];
    const measurement = recipe?.[measureKey];

    if (!ingredient || !measurement) {
      break;
    }

    newIngredients.push({ ingredient, measurement });
  }
  setIngredients(newIngredients);
};
