
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

interface Recipe {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string | null;
    ingredients: {
      ingredient: string;
      measure: string;
    }[];
    strSource: string;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: string | null;
    dateModified: string | null;
}

export const fetchRecipes = async (searchQuery: string): Promise<Recipe[]> => {
    const response = await fetch(`${API_URL}${searchQuery}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
  
    const data = await response.json();
    if (!data.meals) {
      return [];
    }
  
    return data.meals.map((meal: any) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push({ ingredient, measure });
        }
      }
  
      return {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strDrinkAlternate: meal.strDrinkAlternate,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strInstructions: meal.strInstructions,
        strMealThumb: meal.strMealThumb,
        strTags: meal.strTags,
        strYoutube: meal.strYoutube,
        ingredients,
        strSource: meal.strSource,
        strImageSource: meal.strImageSource,
        strCreativeCommonsConfirmed: meal.strCreativeCommonsConfirmed,
        dateModified: meal.dateModified,
      };
    });
};