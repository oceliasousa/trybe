import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Recipes /> } />
        <Route path="/meals/:recipeId" element={ <RecipeDetails /> } />
        <Route path="/drinks/:recipeId/" element={ <RecipeDetails /> } />
        <Route path="/meals/:idReceita/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/drinks/:idBebida/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/drinks" element={ <Recipes /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="*" element={ <h1>Not Found</h1> } />
      </Routes>
    </div>
  );
}

export default App;
