import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/carteira" element={ <Wallet /> } />
        </Routes>
      </header>
    </div>
  );
}

export default App;
