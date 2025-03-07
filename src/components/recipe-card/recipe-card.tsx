import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToSelected, removeFromSelected } from '../../redux/slices/selected-recipes';
import { RootState } from '../../redux/store';

interface RecipeCardProps {
  recipe: any
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items } = useSelector((state: RootState) => state.selectedRecipes);
    const isFavorite = items.some((item) => item.idMeal === recipe.idMeal);

    const handleNavigateToDetails = () => {
        navigate(`/recipe-details/${recipe.strMeal}`, { state: { recipe } });
    };

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromSelected(recipe.idMeal));
        } else {
            dispatch(addToSelected(recipe));
        }
    };

    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card" style={{ width: '18rem' }}>
            <img 
                src={recipe.strMealThumb} 
                className="card-img-top" 
                alt={recipe.strMeal}
                onClick={handleNavigateToDetails} 
                style={{ cursor: 'pointer' }}
            />
            <div className="card-body">
                <h5 
                    className="card-title"
                    onClick={handleNavigateToDetails} 
                    style={{ cursor: 'pointer' }}>
                    {recipe.strMeal}
                </h5>
                <p className="card-text"><strong>Category:</strong> {recipe.strCategory}</p>
                <p className="card-text"><strong>Place of origin:</strong> {recipe.strArea}</p>
                <button 
                    className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'}`} 
                    onClick={handleToggleFavorite}
                >
                    {isFavorite ? 'Remove from cart' : 'Add to cart'}
                </button>
            </div>
            </div>
        </div>
    );
  };
  
  export default RecipeCard;