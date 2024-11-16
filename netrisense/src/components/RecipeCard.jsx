import React, { useState, useEffect } from 'react';

const RecipeCard = ({ recipe }) => {
  // Check if recipe is already in localStorage (favorite)
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favoriteRecipes.some(fav => fav.Recipe_id === recipe.Recipe_id));
  }, [recipe.Recipe_id]);

  const toggleFavorite = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      // Remove from favorites
      favoriteRecipes = favoriteRecipes.filter(fav => fav.Recipe_id !== recipe.Recipe_id);
    } else {
      // Add to favorites
      favoriteRecipes.push(recipe);
    }

    localStorage.setItem('favorites', JSON.stringify(favoriteRecipes));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 hover:translate-y-2 hover:shadow-xl transition-all duration-300 transform">
      <img
        src={recipe.img_url}
        alt={recipe.Recipe_title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2" dangerouslySetInnerHTML={{ __html: recipe.Recipe_title }}></h3>

        <p className="text-sm text-gray-600 mb-1"><span role="img" aria-label="globe">🌍</span> <strong>Continent:</strong> {recipe.Continent}</p>
        <p className="text-sm text-gray-600 mb-1"><span role="img" aria-label="calories">🍔</span> <strong>Calories:</strong> {recipe.Calories}</p>
        <p className="text-sm text-gray-600 mb-1"><span role="img" aria-label="clock">⏰</span> <strong>Cook time:</strong> {recipe.cook_time} minutes</p>
        <p className="text-sm text-gray-600 mb-3"><span role="img" aria-label="prep-time">🕒</span> <strong>Prep time:</strong> {recipe.prep_time} minutes</p>

        <div className="flex items-center justify-between mt-3">
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300"
          >
            View Recipe
          </a>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-colors duration-300 ${isFavorite ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
