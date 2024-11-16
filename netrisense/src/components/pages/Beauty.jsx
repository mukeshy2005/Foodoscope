import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../RecipeCard';

const categories = [
  {
    name: 'Skin Health',
    image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
    description: 'Explore recipes and tips for skin elasticity',
    subcategories: [
      {
        name: 'Acne',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Coconut%20water', 'Strawberries', 'Lemon', 'Cucumber'],
      },
      {
        name: 'Wrinkles & Fine Lines',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Avocado', 'Tomato', 'Olive%20oil', 'Almonds'],
      },
      {
        name: 'Dry Skin',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Coconut%20water', 'Banana', 'Honey', 'Oats'],
      },
      {
        name: 'Oily Skin',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Green%20tea', 'Tomato', 'Cucumber', 'Aloe%20Vera'],
      },
      {
        name: 'Dark Spots',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Lemon', 'Turmeric', 'Aloe%20Vera', 'Honey'],
      },
    ],
  },
  {
    name: 'Hair Health',
    image: 'https://cdn.pixabay.com/photo/2013/07/18/10/59/woman-163696_1280.jpg',
    description: 'Find meals rich in nutrients for stronger, shinier hair.',
    subcategories: [
      {
        name: 'Hair Growth',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Coconut%20oil', 'Amla', 'Spinach', 'Eggs'],
      },
      {
        name: 'Dandruff',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Tea%20tree%20oil', 'Aloe%20Vera', 'Coconut%20oil', 'Lemon'],
      },
      {
        name: 'Hair Loss Prevention',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Eggs', 'Spinach', 'Almonds', 'Carrots'],
      },
      {
        name: 'Shiny & Glossy Hair',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Olive%20oil', 'Honey', 'Coconut%20oil', 'Banana'],
      },
    ],
  },
  {
    name: 'Anti-Aging',
    image: 'https://cdn.pixabay.com/photo/2024/01/23/10/17/ai-generated-8527384_1280.jpg',
    description: 'Discover recipes packed with antioxidants to help combat aging.',
    subcategories: [
      {
        name: 'Fine Lines & Wrinkles',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Avocado', 'Tomato', 'Cucumber', 'Turmeric'],
      },
      {
        name: 'Collagen Production',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Bone%20broth', 'Berries', 'Citrus%20fruits', 'Leafy%20greens'],
      },
      {
        name: 'Youthful Skin',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Tomato', 'Olive%20oil', 'Carrots', 'Green%20tea'],
      },
      {
        name: 'Brightening & Firming',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Lemon', 'Turmeric', 'Aloe%20Vera', 'Honey'],
      },
    ],
  },
  {
    name: 'Hydration',
    image: 'https://cdn.pixabay.com/photo/2018/03/14/20/04/water-3226252_1280.png',
    description: 'Stay hydrated with meals that replenish and nourish.',
    subcategories: [
      {
        name: 'Water-Rich Foods',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Cucumber', 'Watermelon', 'Lettuce', 'Coconut%20water'],
      },
      {
        name: 'Electrolyte Balance',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Coconut%20water', 'Bananas', 'Spinach', 'Avocado'],
      },
      {
        name: 'Hydration for Skin',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Cucumber', 'Watermelon', 'Coconut%20water', 'Aloe%20Vera'],
      },
      {
        name: 'Replenishing Drinks',
        image: 'https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_1280.png',
        ingredients: ['Coconut%20water', 'Lemon', 'Mint', 'Honey'],
      },
    ],
  },
];


const BeautyCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [ids, setIds] = useState(new Set()); // Using Set to avoid duplicates

    // Function to handle subcategory selection
    const handleToShowSubCategory = (categoryName) => {
      setSelectedCategory((prevCategory) =>
        prevCategory === categoryName ? null : categoryName
      );
    };

    // Function to fetch recipe IDs based on ingredients
    const fetchRecipeIds = (ingredients) => {
      const searchText = ingredients.join(',');
      axios
        .get(`https://cosylab.iiitd.edu.in/recipe-search/ingredients?searchText=${searchText}&pageSize=10`)
        .then((response) => {
          const recipeIds = response.data.payload.data.map((item) => item.ndb_id);
          setIds((prevIds) => new Set([...prevIds, ...recipeIds])); // Ensure no duplicates using Set
        })
        .catch((error) => {
          console.error('Error fetching recipe IDs:', error);
        });
    };

    // Function to fetch recipe details using the recipe IDs
    const fetchRecipeDetails = async (recipeIds) => {
      try {
        // Fetch all recipe details in parallel
        const allRecipes = await Promise.all(
          Array.from(recipeIds).map(async (id) => {
            const response = await axios.get(`https://cosylab.iiitd.edu.in/recipe/${id}`);
            console.log(response.data.payload);
            return response.data.payload; // Return recipe data
          })
        );
        setRecipes(allRecipes); // Set all recipes at once
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    // Fetch recipes whenever the IDs change
    useEffect(() => {
      if (ids.size > 0) {
        fetchRecipeDetails(ids);
      }
    }, [ids]); // Run when the IDs change

    console.log(recipes)

    // Function to handle when a subcategory is selected
    const handleSubcategoryClick = (subcategory) => {
      fetchRecipeIds(subcategory.ingredients); // Fetch recipe IDs for the ingredients
    };

    return (
      <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-extrabold text-center text-white bg-purple-600 py-4 px-8 rounded-lg shadow-lg mb-12">
          What's Your Beauty Goal?
        </h1>

        {/* Category selection grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {categories.map((category, index) => (
            <div
              key={index}
              className="w-full h-auto flex flex-col items-center justify-center bg-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />

              <button
                onClick={() => handleToShowSubCategory(category.name)}
                className="w-full text-center p-4 hover:bg-purple-200 transition duration-300"
              >
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </button>
            </div>
          ))}
        </div>

        {/* Render subcategories section below the selected category */}
        {selectedCategory && (
          <div className="mt-12 w-full max-w-6xl">
            <h2 className="text-2xl font-semibold text-center mb-6">Explore Your Health Issue</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {categories
                .find((category) => category.name === selectedCategory)
                ?.subcategories.map((subcategory, subIndex) => (
                  <button
                    key={subIndex}
                    className="w-40 h-auto flex flex-col items-center justify-center bg-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300"
                    onClick={() => handleSubcategoryClick(subcategory)} // Trigger the API call
                  >
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <p className="text-sm mt-2 font-medium">{subcategory.name}</p>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Display recipes using RecipeCard if available */}
        {recipes.length > 0 && (
          <div className="mt-12 w-full max-w-6xl">
            <h2 className="text-2xl font-semibold text-center mb-6">Recommended Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
};

export default BeautyCategories;