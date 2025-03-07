import { combineReducers } from 'redux';
import selectedRecipesSlice from './slices/selected-recipes';

const rootReducer = combineReducers({
  selectedRecipes: selectedRecipesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;