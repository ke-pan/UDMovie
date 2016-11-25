import React, { Component } from 'react';
import MovieList from './components/movie-list';
import Nav from './components/nav';
import { Spin } from 'antd';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: 'upcoming',
      loading: true,
      movies: [],
    };
    this.menuChange = this.menuChange.bind(this);
    this.toggleFav = this.toggleFav.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.setMovies = this.setMovies.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.storeMovie = this.storeMovie.bind(this);
  }
  componentDidMount() {
    const favMovieIds = this.getMovies().map(movie => movie.id);
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=1f3fcca95ad2c90c6dbd7693f5f44038')
      .then(resp => resp.json()).then(json => {
        this.setState({
          loading: false,
          movies: json.results.map(movie => {
            if (favMovieIds.indexOf(movie.id) !== -1) movie.fav = true;
            return movie
          })
        });
      });
  }
  render() {
    return (
      <div>
        <Nav menuChange={this.menuChange} menu={this.state.menu}/>
        { this.state.loading ?
          (<div className='loading'> <Spin size="large"/> </div>) :
          (<MovieList movies={this.state.movies} toggleFav={this.toggleFav} />)
        }
      </div>

    );
  }
  menuChange(e) {
    const menu = e.key;
    if (menu === 'upcoming') {
      this.setState({
        loading: true,
        menu
      });
      const favMovieIds = this.getMovies().map(movie => movie.id);
      fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=1f3fcca95ad2c90c6dbd7693f5f44038')
        .then(resp => resp.json()).then(json => {
          this.setState({
            loading: false,
            movies: json.results.map(movie => {
              if (favMovieIds.indexOf(movie.id) !== -1) movie.fav = true;
              return movie
            })
          });
        });
    } else {
      const movies = this.getMovies();
      this.setState({ menu, movies });
    }
  }
  toggleFav(movie) {
    movie.fav = !movie.fav
    if (movie.fav) {
      this.storeMovie(movie);
    } else {
      this.removeMovie(movie);
    }
    this.setState(prevState => ({
      movies: prevState.movies
    }));
  }
  storeMovie(movie) {
    let movies = this.getMovies();
    movies.push(movie);
    this.setMovies(movies);
  }
  removeMovie(movie) {
    let movies = this.getMovies();
    const id = movies.findIndex(e => e.id === movie.id);
    movies.splice(id, 1);
    this.setMovies(movies);
  }
  getMovies() {
    return JSON.parse(localStorage.getItem('favs')) || [];
  }
  setMovies(movies) {
    localStorage.setItem('favs', JSON.stringify(movies));
  }
}

export default App;
