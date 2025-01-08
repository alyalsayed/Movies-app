import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../services/api';

const useSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false);

  const {
    data: searchResults,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['searchMovies', query, currentPage],
    queryFn: () => searchMovies(query, currentPage),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: searchTrigger, 
  });


  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setSearchTrigger(false); 
      }, 1000);
      return () => clearTimeout(timer); 
    }
  }, [isSuccess]);

  const handleSearch = (page: number = 1) => {
    if (!query) {
      return; 
    }
    setCurrentPage(page);
    setSearchTrigger(true); 
    
  };

  return {
    query,
    setQuery,
    currentPage,
    setCurrentPage,
    searchResults,
    isLoading,
    isError,
    isSuccess,
    handleSearch,
  };
};

export default useSearch;