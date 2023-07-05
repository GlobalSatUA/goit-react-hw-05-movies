import React, { useEffect, useState } from 'react';
import { getMovieCredits } from '../api/api';

function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      if (movieId) {
        const credits = await getMovieCredits(movieId);
        setCast(credits);
      }
    };
    fetchMovieCredits();
  }, [movieId]);

  return (
    <div>
      <h1>Cast</h1>
      {cast.map((actor) => (
        <div key={actor.id}>
          <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
          <p>Name: {actor.name}</p>
          <p>Role: {actor.character}</p>
        </div>
      ))}
    </div>
  );
}

export default Cast;
