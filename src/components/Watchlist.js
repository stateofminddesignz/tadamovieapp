import React from 'react';

function Watchlist({ watchlist }) {
  return (
    <div>
      <h2>Watchlist</h2>
      {watchlist.map((movie) => (
        <div key={movie.id}>
          {/* Render movie details */}
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
