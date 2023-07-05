import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../api/api';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

function MovieDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const movieId = location.pathname.split('/')[2];
  const [movie, setMovie] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movie = await getMovieDetails(movieId);
      setMovie(movie);
    };
    fetchMovieDetails();
  }, [movieId]);

  const goBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <h1>{movie.title} ({movie.release_date && movie.release_date.split('-')[0]})</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>User Score: {movie.vote_average * 10}%</p>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>

      <div>
        <p>Additional information</p>
        <button onClick={() => handleTabClick('cast')}>Cast</button>
        <button onClick={() => handleTabClick('reviews')}>Reviews</button>
      </div>

      <div>
        {selectedTab === 'cast' && (
          <div>
            <Cast movieId={movieId} />
          </div>
        )}

        {selectedTab === 'reviews' && (
          <div>
            <Reviews movieId={movieId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
