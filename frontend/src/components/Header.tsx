import React from "react";
import { Link } from "react-router-dom";
import { StarIcon, HeartIcon } from "@heroicons/react/24/solid"; // Import Heroicons

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 px-8 py-5 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-yellow-400 font-bold text-2xl">IMDb</div>
          <StarIcon className="h-4 w-4 text-yellow-400" /> {/* Heroicon star */}
        </Link>

        <Link
          to="/favorites"
          className="text-gray-300 hover:text-yellow-400 transition-colors"
        >
          <HeartIcon className="h-6 w-6" /> 
        </Link>
      </nav>
    </header>
  );
};

export default Header;