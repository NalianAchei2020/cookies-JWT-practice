import './App.css';
import Login from './login';
import { StoreProvider } from './context/store';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/users';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <br />
        <br />
        <Register />
        <Login />
        <Router>
          <Routes>
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
