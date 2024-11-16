import { FaHome, FaHeart, FaUtensils, FaPlusCircle, FaChartBar, FaVial } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div 
            className={`bg-gray-900 text-white flex flex-col items-center py-6 h-full fixed top-0 left-0 ${isExpanded ? 'w-40' : 'w-16'} transition-all duration-300 ease-in-out shadow-xl overflow-y-auto`} 
        >
            {/* Home Icon */}
            <Link to="/" className="mb-10 flex flex-col items-center group hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                <FaHome size={30} className="group-hover:text-lime-500 transition-colors duration-300" />
                {isExpanded && <span className="text-sm mt-2 text-center group-hover:text-lime-500 transition-colors duration-300">Home</span>}
            </Link>

            {/* Favorites Icon */}
            <Link to="/favourite" className="mb-10 flex flex-col items-center group hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                <FaHeart size={30} className="group-hover:text-pink-500 transition-colors duration-300" />
                {isExpanded && <span className="text-sm mt-2 text-center group-hover:text-pink-500 transition-colors duration-300">Favorites</span>}
            </Link>

            {/* Recipe Icon */}
            <Link to="/recipe" className="mb-10 flex flex-col items-center group hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                <FaUtensils size={30} className="group-hover:text-yellow-500 transition-colors duration-300" />
                {isExpanded && <span className="text-sm mt-2 text-center group-hover:text-yellow-500 transition-colors duration-300">Recipe</span>}
            </Link>

            {/* Beauty Icon */}
            <Link to="/beauty" className="mb-10 flex flex-col items-center group hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                <AutoFixHighIcon size={30} className="group-hover:text-yellow-500 transition-colors duration-300" />
                {isExpanded && <span className="text-sm mt-2 text-center group-hover:text-yellow-500 transition-colors duration-300">Beauty</span>}
            </Link>

            

           

            {/* Chart Icon */}
            <Link to="/chart" className="mb-10 flex flex-col items-center group hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                <FaChartBar size={30} className="group-hover:text-yellow-500 transition-colors duration-300" />
                {isExpanded && <span className="text-sm mt-2 text-center group-hover:text-yellow-500 transition-colors duration-300">Chart</span>}
            </Link>

            {/* Receptor Icon */}
            <Link to="/receptor" className="mb-10 flex flex-col items-center group hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                <FaVial size={30} className="group-hover:text-yellow-500 transition-colors duration-300" />
                {isExpanded && <span className="text-sm mt-2 text-center group-hover:text-yellow-500 transition-colors duration-300">Receptor</span>}
            </Link>

            {/* Bottom Decorative Line */}
            <div className="mt-auto mb-4 w-1/2 h-1 bg-gray-600 rounded-full"></div>
        </div>
    );
};

export default Sidebar;
