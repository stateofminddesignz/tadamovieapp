function MovieCard({ movie, addToWatchlist, removeFromWatchlist, isInWatchlist }) {
  const title = movie.title || movie.name; // Handle both movies and TV shows

  return (
      <div className='card'>
          <img className='card--image' 
               src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} 
               alt={title + ' poster'} />

          <div className='card-content'>
              <h3 className='card--title'>{title}</h3>
              <p><small>Release Date: {movie.release_date || movie.first_air_date}</small></p>
              <p><small>Rating: {movie.vote_average}</small></p>
              <p className='card--desc'>{movie.overview}</p>

              {isInWatchlist ? (
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline button-click-effect" onClick={() => removeFromWatchlist(movie.id)}>Remove from Watchlist</button>
              ) : (
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline button-click-effect" onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
              )}
          </div>
      </div>
  );
}

export default MovieCard;
