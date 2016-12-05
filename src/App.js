import React, { Component } from 'react';
import MovieList from './components/movie-list';
import Nav from './components/nav';
import { storeMovie, removeMovie, getMovies } from './util';
import { Spin } from 'antd';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: 'now_playing',
      loading: true,
      movies: [],
    };
    this.menuChange = this.menuChange.bind(this);
    this.clearFav = this.clearFav.bind(this);
    this.setFav = this.setFav.bind(this);
  }
  componentDidMount() {
    const favMovieIds = getMovies().map(movie => movie.id);
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=1f3fcca95ad2c90c6dbd7693f5f44038')
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
          (<MovieList movies={this.state.movies} clearFav={this.clearFav} setFav={this.setFav}/>)
        }
      </div>

    );
  }
  menuChange(e) {
    const menu = e.key;
    if (menu === 'now_playing') {
      this.setState({
        loading: true,
        menu
      });
      const favMovieIds = getMovies().map(movie => movie.id);
      fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=1f3fcca95ad2c90c6dbd7693f5f44038')
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
      const movies = getMovies();
      this.setState({ menu, movies });
    }
  }
  clearFav(movie) {
    movie.fav = false;
    removeMovie(movie);
    this.setState(prevState => ({
      movies: prevState.movies
    }));
  }
  setFav(movie, dateString) {
    movie.fav = true
    movie.book_date = dateString;
    storeMovie(movie);
    this.setState(prevState => ({
      movies: prevState.movies
    }));
  }
}

export default App;
