// src/components/Home.js
import { useState, useEffect } from 'react';
import useFetchRecipe from '../../context/useFetchRecipe';
import Loading from '../loader/Loading';
import Sidebar from '../sideBar';
import RecipeOfTheDay from '../RecipeOfTheDay'; // Import the new component
import IngridentCategory from '../IngridentCategory';
import RecipeCard from '../RecipeCard';

const Home = () => {
  const { data, loading, error } = useFetchRecipe('recipe/recipeOftheDay');
  console.log(data);

  const [ingredientSearchQuery, setIngredientSearchQuery] = useState('');
  const [ingredientResults, setIngredientResults] = useState([]);
  const [ingredientLoading, setIngredientLoading] = useState(false);
  const [ingredientError, setIngredientError] = useState(null);

  // Fetch the ingredient search results from the API
  const fetchIngredientData = async () => {
    if (!ingredientSearchQuery) return;  // Don't fetch if search query is empty
    setIngredientLoading(true);
    setIngredientError(null);

    try {
      const response = await fetch(
        `https://cosylab.iiitd.edu.in/recipe-search/ingredients?searchText=${ingredientSearchQuery}&pageSize=10`
      );
      const data = await response.json();
      setIngredientResults(data.payload.data); // Assuming this is how the data is structured
    } catch (err) {
      setIngredientError(err);
    } finally {
      setIngredientLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredientData();
  }, [ingredientSearchQuery]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl my-10">
      <Sidebar />

      {loading && <Loading />}

      {/* Recipe of the Day at the top */}
      <RecipeOfTheDay data={data} />

      {/* Ingredient Search */}
      <div className="mt-10">
        <h2 className="text-3xl text-center font-semibold text-gray-700 mb-6">Search Recipes by Ingredient</h2>
        <input
          type="text"
          value={ingredientSearchQuery}
          onChange={(e) => setIngredientSearchQuery(e.target.value)}
          placeholder="Search by ingredient (e.g., herb)"
          className="w-full p-2 rounded-md border border-gray-300"
        />

        {ingredientLoading && <div className="text-center text-xl text-green-500 mt-4">Searching...</div>}
        {ingredientError && <div className="text-center text-xl text-red-500 mt-4">Error: {ingredientError.message}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {ingredientResults.map((recipe) => (
            <RecipeCard key={recipe.Recipe_id} recipe={recipe} />
          ))}
        </div>
      </div>

      {/* If there's no search query, show the ingredient category */}
      {ingredientSearchQuery === '' && <IngridentCategory />}
    </div>
  );
};

export default Home;
