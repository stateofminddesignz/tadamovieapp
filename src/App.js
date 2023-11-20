import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SearchMovies from './components/SearchMovies';
import Watchlist from './components/Watchlist';
import Header from './components/Header';
import './App.css';

function App() {
    const [watchlist, setWatchlist] = useState(() => {
        const savedWatchlist = localStorage.getItem('watchlist');
        return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        if (!watchlist.some(watchlistMovie => watchlistMovie.id === movie.id)) {
            setWatchlist([...watchlist, movie]);
        }
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist(watchlist.filter(movie => movie.id !== movieId));
    };

    return (
        <Router>
            <Header />
            <nav className='text-white'>
                <Link className='ml-6' to="/">Search Movies</Link> | <Link to="/watchlist">Watchlist</Link>
            </nav>
            <div className="container">
                <Switch>
                    <Route exact path="/" render={() => <SearchMovies addToWatchlist={addToWatchlist} />} />
                    <Route path="/watchlist" render={() => <Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
