// useFetchRecipe.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRecipe = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Make the API call using the provided endpoint
                const response = await axios.get(`https://cosylab.iiitd.edu.in/${endpoint}`);
                setData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]); // Trigger effect if endpoint changes

    return { data, loading, error };
};

export default useFetchRecipe;
