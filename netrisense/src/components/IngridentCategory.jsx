import React from 'react';
import { useNavigate } from 'react-router-dom';

const IngridentCategory = () => {
  const navigate = useNavigate();
  const ingredientSearchQueries = [
    { name: 'Herb', query: 'herb', image: 'https://plus.unsplash.com/premium_photo-1693266635481-37de41003239?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGVyYnN8ZW58MHx8MHx8fDA%3D' },
    { name: 'Spice', query: 'spice', image: 'https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BpY2V8ZW58MHx8MHx8fDA%3D' },
    { name: 'Vegetable', query: 'vegetable', image: 'https://plus.unsplash.com/premium_photo-1707242995183-13d6e81f6de7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnaXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Fruit', query: 'fruit', image: 'https://plus.unsplash.com/premium_photo-1671379086168-a5d018d583cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJ1aXR8ZW58MHx8MHx8fDA%3D' },
    { name: 'Cheese', query: 'cheese', image: 'https://plus.unsplash.com/premium_photo-1691939610797-aba18030c15f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZXNlfGVufDB8fDB8fHww' },
    { name: 'Nuts', query: 'nuts', image: 'https://images.unsplash.com/photo-1477506350614-fcdc29a3b157?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bnV0c3xlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Meat', query: 'meat', image: 'https://plus.unsplash.com/premium_photo-1668616816933-f3874102f54b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVhdHxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Fish', query: 'fish', image: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpc2h8ZW58MHx8MHx8fDA%3D' },
    { name: 'Grain', query: 'grain', image: 'https://plus.unsplash.com/premium_photo-1671130295823-78f170465794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3JhaW58ZW58MHx8MHx8fDA%3D' },
    { name: 'Milk', query: 'milk', image: 'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Sugar', query: 'sugar', image: 'https://plus.unsplash.com/premium_photo-1666174323324-24ca53b2e268?q=80&w=1904&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Salt', query: 'salt', image: 'https://plus.unsplash.com/premium_photo-1668447346308-a611fb5e5c31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FsdHxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Butter', query: 'butter', image: 'https://plus.unsplash.com/premium_photo-1700088853545-e6529edb2d25?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnV0dGVyfGVufDB8fDB8fHww' },
    { name: 'Oil', query: 'oil', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Egg', query: 'egg', image: 'https://images.unsplash.com/photo-1607690424395-6660d838d818?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ];

  const handleIngredientClick = (ingredientName) => {
    navigate(`/category/${ingredientName}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {ingredientSearchQueries.map((ingredient) => (
        <div
          key={ingredient.query}
          onClick={() => handleIngredientClick(ingredient.query)}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out text-center"
        >
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
          />
          <div className="p-4">
            <p className="text-lg font-semibold">{ingredient.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IngridentCategory;
