import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';

function App() {
  return (
    <main>
      <p>TrybeTunes</p>
      <Routes>
        <Route
          path="/"
          Component={ Login }
        />
        <Route Component={ Layout }>
          <Route
            path="/search"
            Component={ Search }
          />
          <Route
            path="/album/:id"
            Component={ Album }
          />
          <Route
            path="/favorites"
            Component={ Favorites }
          />
          <Route
            path="/profile"
            Component={ Profile }
          />
          <Route
            path="/profile/edit"
            Component={ ProfileEdit }
          />
          <Route
            path="*"
            Component={ NotFound }
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
