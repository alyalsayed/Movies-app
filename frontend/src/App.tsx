import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="bg-blue-500 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:underline">
              Search
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="text-white hover:underline">
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
