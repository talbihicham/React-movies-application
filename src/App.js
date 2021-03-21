import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovielistHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {

  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('avengers');

  const getMovieRequest = async (searchValue) => {

    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c9e23a37`;

    const response = await fetch(url);

    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }
    
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className = 'container-fluid movie-app' >
      <div className = 'row d-flex align-items-center mt-4 mb-4'> 
        <MovielistHeading heading = 'Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>

      <div className = 'row'>
        <MovieList 
          movies={movies} 
          handleFavouriteClick={addFavouriteMovie} 
          favouriteComponent={AddFavourite}
        />
      </div>

      <div className = 'row d-flex align-items-center mt-4 mb-4'> 
        <MovielistHeading heading = 'Favourites'/>
      </div>
      <div className = 'row'>
        <MovieList 
          movies={favourites} 
          handleFavouriteClick={removeFavouriteMovie} 
          favouriteComponent={RemoveFavourites}
        />
      </div>

    </div>
  );
}

export default App;
