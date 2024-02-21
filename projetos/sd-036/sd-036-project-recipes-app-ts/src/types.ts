import { ThunkDispatch } from 'redux-thunk';

export type PageTittleProp = {
  pageTittle: string;
};

export type MealsType = {
  [key: string]: string;
};

export type DrinksType = {
  [key: string]: string;
};

export type SharedRecipeType = {
  strCategory: string;
  strInstructions: string;
  strArea: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
};

export type MealType = SharedRecipeType & {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strYoutube: string;
};

export type DrinkType = SharedRecipeType & {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
};

export type RecipeType = DrinkType | MealType;

export type RecipeKeysType = keyof RecipeType;

export type RecommendationCardProps = {
  recipe: RecipeType;
  index: number;
};

export type RecommendationsProps = {
  recipes: RecipeType[];
};

export type DoneRecipeType = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
};

export type InProgressRecipeType = {
  meals: {
    [key: string]: string[];
  },
  drinks: {
    [key: string]: string[];
  }
};

export type FavoriteRecipeType = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
};

export type ReduxState = {
  user: {
    email: string;
  }

  meals: {
    meals: MealsType[]
  }

  drinks: {
    drinks: DrinksType[]
  };
};

export type Ingredients = {
  ingredient: string;
  measurement: string;
};

export type Dispatch = ThunkDispatch<any, any, any>;
