import React, { useEffect, useState } from 'react';
import { getMovieReviews } from '../api/api';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      if (movieId) {
        const reviews = await getMovieReviews(movieId);
        setReviews(reviews);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>Reviews not found</p>
      )}
    </div>
  );
}

export default Reviews;
