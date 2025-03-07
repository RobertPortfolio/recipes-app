import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

const RecipeDetailsPage: FC = () => {
    const location = useLocation();
    const recipe = location.state?.recipe;

    if (!recipe) {
        return <p>No data about meal</p>;
    }

    return(
        <div className="container my-5">
            <div className="card mb-4">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img 
                        src={recipe.strMealThumb} 
                        className="img-fluid rounded-start" 
                        alt={recipe.strMeal} 
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                        <h1 className="card-title">{recipe.strMeal}</h1>
                        <p className="card-text">
                            <strong>Category:</strong> {recipe.strCategory}
                        </p>
                        <p className="card-text">
                            <strong>Place of origin:</strong> {recipe.strArea}
                        </p>
                        {recipe.strDrinkAlternate && (
                            <p className="card-text">
                            <strong>Drink Alternate:</strong> {recipe.strDrinkAlternate}
                            </p>
                        )}
                        {recipe.strTags && (
                            <p className="card-text">
                            <strong>Tags:</strong> {recipe.strTags}
                            </p>
                        )}
                        {recipe.strYoutube && (
                            <p className="card-text">
                            <strong>YouTube:</strong> 
                            <a 
                                href={recipe.strYoutube} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="ms-1"
                            >
                                Watch Video
                            </a>
                            </p>
                        )}
                        {recipe.strSource && (
                            <p className="card-text">
                            <strong>Source:</strong> 
                            <a
                                href={recipe.strSource} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="ms-1"
                            >
                                View Source
                            </a>
                            </p>
                        )}
                        {recipe.strImageSource && (
                            <p className="card-text">
                            <strong>Image Source:</strong> 
                            <a 
                                href={recipe.strImageSource} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="ms-1"
                            >
                                Image Info
                            </a>
                            </p>
                        )}
                        {recipe.strCreativeCommonsConfirmed && (
                            <p className="card-text">
                            <strong>Creative Commons:</strong> {recipe.strCreativeCommonsConfirmed}
                            </p>
                        )}
                        {recipe.dateModified && (
                            <p className="card-text">
                            <small className="text-muted">
                                Last Modified: {new Date(recipe.dateModified).toLocaleDateString()}
                            </small>
                            </p>
                        )}
                        </div>
                    </div>
                </div>
            </div>

            
            <div className='row g-2'>
    <div className="col-12 col-md-4">
        <div className="card h-100">
            <div className="card-body">
                <h4 className="card-title">Ingredients</h4>
                <ul className="list-group list-group-flush">
                    {recipe.ingredients.map((item: any, index: number) => (
                        <li key={index} className="list-group-item">
                            {item.ingredient} - {item.measure}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    <div className="col-12 col-md-8">
        <div className="card h-100">
            <div className="card-body">
                <h4 className="card-title">Instructions</h4>
                <p className="card-text">{recipe.strInstructions}</p>
            </div>
        </div>
    </div>
</div>
        </div>
    );
}

export { RecipeDetailsPage };