import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RecipeCard from '../components/recipe-card';

const SelectedRecipesPage: FC = () => {
    const { items } = useSelector((state: RootState) => state.selectedRecipes);

    if (items.length === 0) return <p className="alert alert-primary m-3">Cart is empty</p>;

    // Сумма інгридієнтів
    const ingredientsMap: Record<string, string[]> = {};

    items.forEach((recipe) => {
        recipe.ingredients.forEach(({ ingredient, measure }) => {
            if (ingredient) {
                if (!ingredientsMap[ingredient]) {
                    ingredientsMap[ingredient] = [];
                }
                ingredientsMap[ingredient].push(measure);
            }
        });
    });

    const mergedIngredients = Object.entries(ingredientsMap).map(([ingredient, measures]) => ({
        ingredient,
        measure: measures.join(', '),
    }));
    
    return (
        <div className="p-3">
            <h2 className="p-3">Selected Recipes</h2>
            <div className="row">
                {items.map((item) => (
                    <RecipeCard key={item.idMeal} recipe={item} />
                ))}
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <h4 className="card-title">Total Ingredients</h4>
                    <ul className="list-group list-group-flush">
                        {mergedIngredients.map(({ ingredient, measure }, index) => (
                            <li key={index} className="list-group-item">
                                {ingredient} - {measure}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="card mt-4">
                {items.map((item) => 
                <div className="card-body" key={item.idMeal}>
                    <h4 className="card-title">Instructions for {item.strMeal}</h4>
                    <p className="card-text">{item.strInstructions}</p>
                </div> 
                )}
                
            </div>
        </div>
    );
};

export { SelectedRecipesPage };