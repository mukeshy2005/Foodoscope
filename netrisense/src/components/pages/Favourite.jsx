import React, { useState, useEffect } from 'react';
import RecipeCard from '../RecipeCard'; // Import RecipeCard component

const Favourite = () => {
  // Get the full list of favorite recipes from localStorage
  const favoriteRecipes = JSON.parse(window.localStorage.getItem('favorites')) || [];
  const [loading, setLoading] = useState(false);  // No need to fetch, so set loading to false directly
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favoriteRecipes.length === 0) {
      setError("No favorite recipes found in localStorage.");
    }
  }, [favoriteRecipes]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='ml-5'>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Favourite Recipes</h2>
      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Loop through each recipe and display the RecipeCard */}
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.Recipe_id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No favourite recipes found.</p>
      )}
    </div>
  );
};

export default Favourite;
