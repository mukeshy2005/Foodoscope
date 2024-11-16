
import useFetchRecipe from '../../context/useFetchRecipe'

const SearchPage = () => {
    const { data, loading, error } = useFetchRecipe('recipe/2610'); // Pass 'recipeOftheDay' endpoint

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div>
            <h1>Recipe of the Day</h1>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default SearchPage