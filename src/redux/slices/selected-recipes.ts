import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface SelectedRecipes {
    items: Recipe[];
}
  
const initialState: SelectedRecipes = {
    items: [],
};
  
const selectedRecipesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToSelected: (state, action: PayloadAction<Recipe>) => {
            const isExist = state.items.some((item) => item.idMeal === action.payload.idMeal);
            if (!isExist) {
            state.items.push(action.payload);
            }
        },
        removeFromSelected: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.idMeal !== action.payload);
        },
    },
}); 
  
export const { addToSelected, removeFromSelected } = selectedRecipesSlice.actions;
export default selectedRecipesSlice.reducer;
