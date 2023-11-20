import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const SearchMovies = ({ addToWatchlist }) => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = '41a875047ddc46e62a999adc0f52d74a'; // Replace with your TMDB API key

    const fetchMovies = async (url) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results || []); // Set to empty array if data.results is undefined
        } catch (err) {
            setError('Failed to fetch movies. Please try again.');
            setMovies([]); // Set to empty array on error
        } finally {
            setIsLoading(false);
        }
    };
    

    const fetchDefaultMovies = () => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
        fetchMovies(url);
    };

    const fetchPopularMovies = () => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        fetchMovies(url);
    };

   

    useEffect(() => {
        fetchDefaultMovies();
    }, []);

    const searchMovies = async (e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
        fetchMovies(url);
    };

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name or Keywords</label>
                <input className="input" type="text" name="query" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="button" type="submit">Search</button>
            </form>
            <div className='text-white mt-3 text-center text-3xl'>
                <button onClick={fetchDefaultMovies}>New Releases |</button>
                <button className='ml-2' onClick={fetchPopularMovies}>Popular Movies </button>
                
            </div>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className='card-list'>
    {movies && movies.length > 0 ? (
        movies.map(movie => (
            <MovieCard 
                movie={movie} 
                key={movie.id} 
                addToWatchlist={() => addToWatchlist(movie)}
            />
        ))
    ) : (
        !isLoading && <div>No movies found. Try different keywords.</div>
    )}
</div>

        </>
    );
}

export default SearchMovies;
