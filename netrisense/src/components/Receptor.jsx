import React, { useState, useEffect } from 'react';

function Receptor() {
  const [receptors, setReceptors] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedReceptor, setSelectedReceptor] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // API URLs
  const receptorApiUrl = 'https://cosylab.iiitd.edu.in/api/receptors';
  const recipeApiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Mock recipe API for testing

  // Fetch receptors
  const fetchReceptors = async () => {
    setLoading(true);
    try {
      const response = await fetch(receptorApiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch receptors');
      }
      const data = await response.json();
      setReceptors(data);
    } catch (error) {
      if (error.message === 'Failed to fetch receptors') {
        console.log('Retrying to fetch receptors...');
        setTimeout(fetchReceptors, 5000); // Retry after 5 seconds
      } else {
        setError('Error fetching receptor data');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes based on selected receptor
  const fetchRecipesByReceptor = async (receptorName) => {
    setLoading(true);
    try {
      // Replace with your actual API URL
      // const response = await fetch(`${recipeApiUrl}?receptor=${receptorName}`);
      const response = await fetch(recipeApiUrl); // Mock request for testing
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const recipesData = await response.json();
      setRecipes(recipesData);
    } catch (error) {
      setError('Error fetching recipes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle receptor selection change
  const handleReceptorSelect = (event) => {
    const receptorName = event.target.value;
    setSelectedReceptor(receptorName);
    fetchRecipesByReceptor(receptorName);
  };

  // Handle form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchReceptors();
  };

  useEffect(() => {
    fetchReceptors();
  }, []);

  return (
    <div className="container">
      <h1>Search Receptors and Find Recipes</h1>

      {/* Receptor search form */}
      <form onSubmit={handleSearchSubmit}>
        <button type="submit" className="btn btn-primary">Fetch Receptors</button>
      </form>

      {/* Error Message */}
      {error && <p className="text-danger">{error}</p>}

      {/* Receptor dropdown */}
      {!loading && !error && receptors.length > 0 && (
        <div>
          <label htmlFor="receptorSelect">Select Receptor: </label>
          <select
            id="receptorSelect"
            className="form-control"
            value={selectedReceptor}
            onChange={handleReceptorSelect}
          >
            <option value="">--Select Receptor--</option>
            {receptors.map((receptor) => (
              <option key={receptor.id} value={receptor.receptor_name}>
                {receptor.receptor_name} - {receptor.taste}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Recipe results */}
      {!loading && recipes.length > 0 && (
        <div>
          <h3>Recipes for {selectedReceptor} receptor:</h3>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>{recipe.title || 'No title available'}</li>
            ))}
          </ul>
        </div>
      )}

      {/* No Recipes Found */}
      {!loading && recipes.length === 0 && selectedReceptor && (
        <p>No recipes found for the selected receptor.</p>
      )}
    </div>
  );
}

export default Receptor;
