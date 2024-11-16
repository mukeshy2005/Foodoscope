import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SearchPage from './components/pages/SearchPage';
import Sidebar from './components/sideBar';
import Recipe from './components/pages/Recipe';
import Favourite from './components/pages/Favourite';
import IngredientDetails from './components/pages/IngredientDetails';
import BeautyCategories from './components/pages/Beauty';
import Chart from './components/Chart';
import Receptor from './components/Receptor';
function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-14">
        <Routes>
          {/* Ensure that the /home route is defined */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} /> {/* Add this route for /home */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recipe" element={<Recipe/>} />
          <Route path="/favourite" element={<Favourite/>} />
          <Route path="/category/:ingredientName" element={<IngredientDetails />} />
          <Route path="/beauty" element={<BeautyCategories/>} />
          <Route path="/chart" element={<Chart/>} />  
          <Route path="/receptor" element={<Receptor/>} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
