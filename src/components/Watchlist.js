import React from 'react';
import MovieCard from './MovieCard';

function Watchlist({ watchlist, removeFromWatchlist }) {
    return (
        <div>
            <h2>Watchlist</h2>
            <div className='card-list'>
                {watchlist.length > 0 ? (
                    watchlist.map(movie => (
                        <MovieCard 
                            movie={movie} 
                            key={movie.id} 
                           
                           removeFromWatchlist={() => removeFromWatchlist(movie.id)}
                            isInWatchlist={true}
                        />
                    ))
                ) : (
                    <div>Your watchlist is empty.</div>
                )}
            </div>
        </div>
    );
}

export default Watchlist;
