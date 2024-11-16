import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../RecipeCard';  // Importing the RecipeCard Component
import ContinentRecipeList from '../ContinentRecipeList'; // Import the new continent recipe list component

const Recipe = () => {
  const [allRecipe, setAllRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const apiUrl = 'https://cosylab.iiitd.edu.in/recipe-search/recipe?pageSize=10&searchText=';

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(apiUrl + searchQuery);
      setAllRecipe(response.data.payload.data); // Assuming the API returns this structure
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRecipes = allRecipe.filter(recipe => 
    recipe.Recipe_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center text-xl text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">Error: {error.message}</p>;

  return (
    <div className="pr-6 ml-5 mt-2">
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 py-2 rounded-lg border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Conditional Search Result Text */}
      {searchQuery.length > 0 && (
        <div>
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Search Result</h1>
          <div className="mb-6 text-center text-xl text-gray-700">
            {filteredRecipes.length > 0 
              ? `${filteredRecipes.length} recipe${filteredRecipes.length > 1 ? 's' : ''} found for "${searchQuery}"`
              : `No recipes found for "${searchQuery}"`}
          </div>
        </div>
      )}

      {/* Default Title if no Search Query */}
      {searchQuery.length === 0 && (
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Recipes from Around the World</h1>
      )}

      {/* Displaying filtered recipes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.Recipe_id} recipe={recipe} />
        ))}
      </div>

      {/* Conditionally Render Continent Recipes when no search query */}
      {searchQuery.length === 0 && <ContinentRecipeList />}
    </div>
  );
};

export default Recipe;
