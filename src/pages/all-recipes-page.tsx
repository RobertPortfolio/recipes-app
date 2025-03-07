import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../services/recipes-api-service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RecipeCard from '../components/recipe-card';
import Pagination from '../components/pagination';
import Filter from '../components/filter';

const PAGE_SIZE = 9;

const AllRecipesPage: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { items } = useSelector((state: RootState) => state.selectedRecipes);
    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
            setCurrentPage(1);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Запит списку рецептів
    const { data, error, isLoading } = useQuery({
        queryKey: ['recipes', debouncedSearchQuery],
        queryFn: () => fetchRecipes(debouncedSearchQuery),
        enabled: debouncedSearchQuery.trim() !== '',
    });

    // Категорії
    const categories = Array.from(new Set(data?.map((recipe) => recipe.strCategory) || []));

    // Фільтрація за категорорією
    const filteredData = data?.filter(
        (recipe) =>
        (selectedCategory ? recipe.strCategory === selectedCategory : true) &&
        (debouncedSearchQuery ? recipe.strMeal.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) : true)
    ) || [];

    // Пагування
    let totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
    let paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <div className='p-3'>
            <div className="d-flex justify-content-between align-items-center p-3">
                <h2>All Recipes</h2>
                <input
                    type="text"
                    placeholder="Find a recipe"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control px-4 py-2 border-primary"
                    style={{ width: '400px' }}
                />
                <div>
                    <Link to="/selected-recipes" className="btn btn-primary">To cart {items.length!==0 && `(${items.length})`}</Link>
                </div>
            </div>

            <div className="d-flex justify-content-center my-3">
                <Filter 
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setCurrentPage={setCurrentPage}
                    categories={categories}
                />
            </div>

            <div className='mt-4'>
                {debouncedSearchQuery.trim() === '' ? (
                    <p>Enter your search term</p>
                ) : isLoading ? (
                    <p>Recipes loading...</p>
                ) : error && error instanceof Error ? (
                    <p>Error: {error.message}</p>
                ) : !data || data.length === 0 ? (
                    <p>No recipes found</p>
                ) : (
                    <>
                        <div className="row">
                            {paginatedData.map((recipe) => (
                                <RecipeCard key={recipe.idMeal} recipe={recipe} />
                            ))}
                        </div>
                        <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                            if (page < 1 || page > totalPages) return;
                            setCurrentPage(page);
                        }}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export { AllRecipesPage };