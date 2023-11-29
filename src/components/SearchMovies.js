import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const SearchMovies = ({ addToWatchlist }) => {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('movies'); // 'movies' or 'tv'
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiKey = '41a875047ddc46e62a999adc0f52d74a'; // Replace with your actual TMDB API key

    useEffect(() => {
        // Default to new releases when the page loads
        fetchCategoryMovies('newReleases');
    }, [searchType]); // Refetch when searchType changes

    const fetchCategoryMovies = async (category) => {
        setIsLoading(true);
        setError('');
        let url = `https://api.themoviedb.org/3`;

        // Construct URL based on category and type (movie or TV)
        if (searchType === 'movies') {
            if (category === 'newReleases') {
                url += `/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
            } else if (category === 'popular') {
                url += `/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
            } else if (category === 'comingSoon') {
                url += `/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;
            }
        } else if (searchType === 'tv') {
            if (category === 'newReleases') {
                url += `/tv/airing_today?api_key=${apiKey}&language=en-US&page=1`;
            } else if (category === 'popular') {
                url += `/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
            } else if (category === 'comingSoon') {
                url += `/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`;
            }
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const baseSearchURL = 'https://api.themoviedb.org/3/search/';
        const typeURL = searchType === 'movies' ? 'movie' : 'tv';
        const searchURL = `${baseSearchURL}${typeURL}?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const response = await fetch(searchURL);
            const data = await response.json();
            setMovies(data.results);
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            
            <form className="form text mt-8" onSubmit={handleSearch}>
                <label  className="label text-red-600 ml-4" htmlFor="query">Search for {searchType}</label>
                <input 
                    className="input" 
                    type="text" 
                    name="query" 
                    placeholder="Search..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button className="button" type="submit">Search</button>
            </form>
            <div className='text-white text-5xl mt-4 ml-4'>
                <button className='mr-5' onClick={() => setSearchType('movies')}>Movies</button>
                <button onClick={() => setSearchType('tv')}>TV Shows</button>
            </div>
            <div className='text-white text-center text-4xl mt-6'>
                <button className='mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => fetchCategoryMovies('newReleases')}>New Releases</button>
                <button className='mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => fetchCategoryMovies('popular')}>Popular</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => fetchCategoryMovies('comingSoon')}>Coming Soon</button>
            </div>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <div className='card-list'>
                {movies.map(movie => (
                    <MovieCard 
                        movie={movie} 
                        key={movie.id} 
                        addToWatchlist={() => addToWatchlist(movie)} 
                    />
                ))}
            </div>
        </>
    );
}

export default SearchMovies;
