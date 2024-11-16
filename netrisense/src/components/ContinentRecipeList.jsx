import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const ContinentRecipeList = () => {
  const [continentRecipes, setContinentRecipes] = useState({
    Africa: [],
    Asia: [],
    Europe: [],
    NorthAmerica: [],
    SouthAmerica: [],
    Australia: [],
    Antarctica: [],
  });
  const [error, setError] = useState(null);

  const continentApis = {
    Africa: 'https://cosylab.iiitd.edu.in/recipe-search/continents?searchText=African&pageSize=10',
    Asia: 'https://cosylab.iiitd.edu.in/recipe-search/continents?searchText=Asian&pageSize=10',
    Europe: 'https://cosylab.iiitd.edu.in/recipe-search/continents?searchText=European&pageSize=10',
    NorthAmerica: 'https://cosylab.iiitd.edu.in/recipe-search/continents?searchText=NorthAmerican&pageSize=10',
    SouthAmerica: 'https://cosylab.iiitd.edu.in/recipe-search/continents?searchText=SouthAmerican&pageSize=10',
    Australia: 'https://cosylab.iiitd.edu.in/recipe-search/continents?searchText=Australian&pageSize=10',
    Antarctica: 'https://cosylab.iiitd.edu.in/recipe-search/continents?searchText=Antarctica&pageSize=10',
  };

  const fetchContinentRecipes = async () => {
    try {
      const continentResponses = await Promise.all(
        Object.keys(continentApis).map(continent => 
          axios.get(continentApis[continent])
        )
      );
      const recipes = continentResponses.reduce((acc, response, index) => {
        acc[Object.keys(continentApis)[index]] = response.data.payload.data;
        return acc;
      }, {});
      setContinentRecipes(recipes);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchContinentRecipes();
  }, []);

  if (error) return <p className="text-center text-xl text-red-500">Error: {error.message}</p>;

  return (
    <div>
      {Object.keys(continentRecipes).map((continent) => {
        const recipes = continentRecipes[continent];
        if (recipes.length === 0) return null;

        return (
          <div key={continent} className="mb-12">
            {/* Continent Name with Separator */}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{continent} Recipes</h2>
            <hr className="mb-6 border-t-2 border-gray-300" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.Recipe_id} recipe={recipe} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContinentRecipeList;
