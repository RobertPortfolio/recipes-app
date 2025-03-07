import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
    AllRecipesPage,
    RecipeDetailsPage,
    SelectedRecipesPage,
} from '../pages';
import Header from '../components/header';

const App = () => {
    return(
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<AllRecipesPage />} />
                <Route path="/recipe-details/:name" element={<RecipeDetailsPage />} />
                <Route path="/selected-recipes" element={<SelectedRecipesPage />} />
            </Routes>
        </div>
    )
}

export default App;