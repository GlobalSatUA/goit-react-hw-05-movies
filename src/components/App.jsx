import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import './main.css'

const MovieDetails = React.lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = React.lazy(() => import('./Cast/Cast'));
const Reviews = React.lazy(() => import('./Reviews/Reviews'));

function Header() {
  return (
    <div className="header">
      <Link to="/" className="header-link">Home</Link>
      <Link to="/movies" className="header-link">Movies</Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<React.Suspense fallback={<div>Loading...</div>}><MovieDetails /></React.Suspense>} />
        <Route path="/movies/:movieId/cast" element={<React.Suspense fallback={<div>Loading...</div>}><Cast /></React.Suspense>} />
        <Route path="/movies/:movieId/reviews" element={<React.Suspense fallback={<div>Loading...</div>}><Reviews /></React.Suspense>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
