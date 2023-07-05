import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { searchMovies } from '../api/api';

function Movies() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false); 
  const [lastSearchTerm, setLastSearchTerm] = useState(''); 

  const query = searchParams.get('search') || '';

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        const movies = await searchMovies(query);
        setMovies(movies);
      } else {
        setMovies([]);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchParams.set('search', searchTerm);
    navigate(`/movies?${searchParams.toString()}`);
    setSearched(true); 
    setLastSearchTerm(searchTerm); 
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>

      {searched && (movies.length > 0 ? (
        <div>
          <h2>Search Results for "{lastSearchTerm}":</h2> 
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{searched ? `No movies found for "${lastSearchTerm}".` : ''}</p>
      ))}
    </div>
  );
}

export default Movies;
