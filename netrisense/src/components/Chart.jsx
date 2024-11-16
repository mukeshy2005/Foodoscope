import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import './Piechart.css'; // Import the CSS file

function Piechart() {
  const [nutrients, setNutrients] = useState({ carbs: 0, proteins: 0, fats: 0 });
  const [foodQuery, setFoodQuery] = useState(""); // To store the search query
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data from the API based on the search query
  const fetchNutrientData = async (query) => {
    setLoading(true);
    setErrorMessage(""); // Clear previous error message

    try {
      const response = await fetch(
        `https://cosylab.iiitd.edu.in/recipe/${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // Check if the data contains the expected nutrients
      if (data.success === "true" && data.payload) {
        const payload = data.payload;

        // Extract and set nutrient values from API response
        setNutrients({
          carbs: parseFloat(payload["Carbohydrate, by difference (g)"]),
          proteins: parseFloat(payload["Protein (g)"]),
          fats: parseFloat(payload["Total lipid (fat) (g)"]),
        });
      } else {
        setErrorMessage("Nutritional information is missing.");
      }
    } catch (error) {
      console.error("Error fetching nutrient data:", error);
      setErrorMessage("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setFoodQuery(event.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (foodQuery) {
      fetchNutrientData(foodQuery);
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        <h1 className="mt-1">Search for Food and View Nutritional Info</h1>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={foodQuery}
            onChange={handleSearchChange}
            placeholder="Enter food ID or name (e.g., 2610)"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary mt-3">
            Search
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        {/* Loading State */}
        {loading && <p>Loading data...</p>}

        {/* Pie Chart */}
        {!loading && !errorMessage && (
          <div className="chart-container">
            <Chart
              type="pie"
              width={800}
              height={500}
              series={[nutrients.carbs, nutrients.proteins, nutrients.fats]}
              options={{
                title: {
                  text: "Nutrient Composition",
                },
                labels: ["Carbohydrates", "Proteins", "Fats"],
                noData: { text: "Loading data..." },
              }}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Piechart;
