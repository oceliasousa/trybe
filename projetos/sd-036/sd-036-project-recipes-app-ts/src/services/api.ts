import { MealsType, DrinksType } from '../types';

export const getRecipesByIngredients = async (ingredient: string):
Promise<MealsType[]> => {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response.meals;
  } catch (error: any) {
    return error;
  }
};

export const getRecipesByName = async (name: string = ''): Promise<MealsType[]> => {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    const data = response.meals;
    return data;
  } catch (error: any) {
    return error;
  }
};

const validateLetter = (letter: string) => {
  if (letter.length > 1) {
    window.alert('Your search must have only 1 (one) character');
  }
};

export const getRecipesByFirstLetter = async (letter: string): Promise<MealsType[]> => {
  try {
    validateLetter(letter);
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response.meals;
  } catch (error: any) {
    return error;
  }
};

export const getDrinksByIngredient = async (ingredient: string):
Promise<DrinksType[]> => {
  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response.drinks;
  } catch (error: any) {
    return error;
  }
};

export const getDrinksByName = async (name:string = ''): Promise<DrinksType[]> => {
  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response.drinks;
  } catch (error: any) {
    return error;
  }
};

export const getDrinksByFirstLetter = async (letter:string): Promise<DrinksType[]> => {
  try {
    validateLetter(letter);
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response.drinks;
  } catch (error: any) {
    return error;
  }
};

export const validateApi = async (recipes: string, ingredient: string) => {
  if (recipes === 'ingredient') {
    const response = await getRecipesByIngredients(ingredient);
    return response;
  }

  if (recipes === 'name') {
    const response = await getRecipesByName(ingredient);
    return response;
  }

  if (recipes === 'firstLetter') {
    const response = await getRecipesByFirstLetter(ingredient);
    return response;
  }
};

export const validateApiDrinks = async (recipes: string, ingredient: string) => {
  if (recipes === 'ingredient') {
    const response = await getDrinksByIngredient(ingredient);
    return response;
  }

  if (recipes === 'name') {
    const response = await getDrinksByName(ingredient);
    return response;
  }

  if (recipes === 'firstLetter') {
    const response = await getDrinksByFirstLetter(ingredient);
    return response;
  }
};

export const getMeals = async () => {
  try {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    const data = response.meals;
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getDrinks = async () => {
  try {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    const data = response.drinks;
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getMealsCategories = async () => {
  try {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    const data = response.meals;
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getMealsbyCategories = async (category: string) => {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    const data = response.meals;
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getDrinksCategories = async () => {
  try {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    const data = response.drinks;
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getDrinksbyCategories = async (category: string) => {
  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    const data = response.drinks;
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getRecipesById = async (id: string): Promise<MealsType[]> => {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response.meals;
  } catch (error: any) {
    return error;
  }
};

export const getDrinksById = async (id: string): Promise<DrinksType[]> => {
  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    return response.drinks;
  } catch (error: any) {
    return error;
  }
};
