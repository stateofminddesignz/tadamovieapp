
import React, {useState} from 'react'
import MovieCard from './MovieCard'

const SearchMovies = ()  => {

const [query , setQuery] = useState('')
const [movies ,setMovies] =useState([])

    const searchMovies = async (e) => {
        e.preventDefault();
        console.log("submitting");
        

        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=41a875047ddc46e62a999adc0f52d74a&language=en-US&query=${query}&page=1&include_adult=false`;
       

        try {
            const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results)

        console.log(data.results)

        }catch(err){
            console.log(err)
        }
        
    }

    
    return (
        <>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">Movie Name</label>
            <input className="input" type="text" name="query"
                placeholder="i.e. Jurassic Park" 
                value={query} onChange={(e) => setQuery(e.target.value)} />
            <button className="button" type="submit">Search</button>
     
        </form>
        <div className='card-list'>
           {movies.filter(movie => movie.poster_path).map( movie =>(
            <MovieCard movie={movie}  key={movie.id} />
           ))}
        </div>
        </>
    );
}

export default SearchMovies