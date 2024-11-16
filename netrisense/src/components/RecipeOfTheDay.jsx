// src/components/RecipeOfTheDay.js
import { FaClock, FaCarrot, FaUtensils, FaFireAlt } from 'react-icons/fa';
import { IoLink } from 'react-icons/io5';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const RecipeOfTheDay = ({ data }) => {
  if (!data) return null;

  const {
    Recipe_title,
    Calories,
    cook_time,
    prep_time,
    servings,
    url,
    img_url,
    Region,
    Sub_region,
    Continent,
    Source,
    Protein,
    'Total lipid (fat)': Fat,
    Carbohydrate,
  } = data?.payload || {};

  return (
    <div className="space-y-8">
      {/* Recipe Image */}
      <div className="flex justify-center">
        <img
          src={img_url}
          alt={Recipe_title}
          className="rounded-lg shadow-md w-full max-w-3xl object-cover"
        />
      </div>

      {/* Recipe Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mt-4">{Recipe_title}</h2>

      {/* Recipe Link */}
      <div className="text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-lg text-green-600 hover:text-green-800 mt-3"
        >
          <IoLink size={24} className="mr-2" />
          <span>View Full Recipe</span>
        </a>
      </div>

      {/* Recipe Details */}
      <div className="mt-4 space-y-4 text-gray-700">
        <div className="flex items-center justify-center space-x-2">
          <HiOutlineLocationMarker size={24} className="text-red-500" />
          <p><strong>Region:</strong> {Region}</p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <HiOutlineLocationMarker size={24} className="text-red-500" />
          <p><strong>Sub-region:</strong> {Sub_region}</p>
        </div>
        <p className="text-center"><strong>Continent:</strong> {Continent}</p>
        <p className="text-center"><strong>Source:</strong> {Source}</p>
      </div>

      {/* Recipe Stats */}
      <div className="grid grid-cols-3 gap-6 mt-8 text-center">
        <div className="flex flex-col items-center">
          <FaClock size={36} className="text-blue-600" />
          <p className="mt-2 font-medium">{cook_time} mins cook</p>
        </div>
        <div className="flex flex-col items-center">
          <FaCarrot size={36} className="text-orange-600" />
          <p className="mt-2 font-medium">{prep_time} mins prep</p>
        </div>
        <div className="flex flex-col items-center">
          <FaUtensils size={36} className="text-purple-600" />
          <p className="mt-2 font-medium">{servings} servings</p>
        </div>
      </div>

      {/* Nutritional Info */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <FaFireAlt size={30} className="text-red-600" />
          <p className="text-xl font-semibold text-red-700">{Calories} kcal</p>
        </div>
        <div className="flex justify-center gap-3">
          <p className="text-gray-700"><strong>Protein:</strong> {Protein} g</p>
          <p className="text-gray-700"><strong>Fat:</strong> {Fat} g</p>
          <p className="text-gray-700"><strong>Carbohydrates:</strong> {Carbohydrate} g</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeOfTheDay;
