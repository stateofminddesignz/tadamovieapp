import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SearchMovies from './components/SearchMovies';
import Watchlist from './components/Watchlist';
import Header from './components/Header';
import './App.css';

function App() {
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('watchlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        if (!watchlist.some(m => m.id === movie.id)) {
            setWatchlist([...watchlist, movie]);
        }
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist(watchlist.filter(movie => movie.id !== movieId));
    };

    return (
        <Router>
            <Header />
            <nav>
                <Link to="/">Search Movies/TV Shows</Link> | <Link to="/watchlist">Watchlist</Link>
            </nav>
            <Switch>
                <Route exact path="/" render={() => <SearchMovies addToWatchlist={addToWatchlist} />} />
                <Route path="/watchlist" render={() => <Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />} />
            </Switch>
        </Router>
    );
}

export default App;
