import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../RecipeCard';

const IngredientDetails = () => {
  const { ingredientName } = useParams(); // Extract ingredient name from URL
  const [catRec, setCatRec] = useState([]); // State for category recipes
  const [id, setId] = useState([]); // State for ingredient IDs
  const [recipes, setRecipes] = useState([]); // State for storing recipe data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetching ingredient-based recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch recipes based on the ingredientName
        const response = await fetch(`https://cosylab.iiitd.edu.in/recipe-search/ingredients?searchText=${ingredientName}&pageSize=10`);
        const data = await response.json();

        if (response.ok) {
          // Assuming the API returns a list of recipes
          setCatRec(data); 
          
          // Extract ingredient IDs (adjust if necessary based on API response structure)
          const ingredientIds = data.map(recipe => recipe.IngID); // assuming 'IngID' is the key in response data
          setId(ingredientIds);

          // Now fetch recipes using these IDs
          const recipeResponses = await Promise.all(
            ingredientIds.map(id =>
              fetch(`https://cosylab.iiitd.edu.in/recipe-search/recipes?id=${id}`)
            )
          );
          const recipeData = await Promise.all(
            recipeResponses.map(response => response.json())
          );
          
          // Flattening the response if necessary and setting it to state
          setRecipes(recipeData.flat());
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        setError(err.message); // Set error state if API call fails
      } finally {
        setLoading(false); // Turn off loading indicator
      }
    };

    fetchRecipes();
  }, [ingredientName]); // Dependency on ingredientName to refetch when it changes

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{ingredientName} Recipes</h1>
      {loading ? (
        <p>Loading...</p> // Show loading text while data is being fetched
      ) : error ? (
        <p>Error: {error}</p> // Show error message if something went wrong
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.Recipe_id} // Assuming Recipe_id is unique for each recipe
                recipe={recipe} // Pass the entire recipe object to the card component
              />
            ))
          ) : (
            <p>No recipes found for this ingredient.</p> // Show message if no recipes are found
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientDetails;
