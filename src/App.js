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
  }
  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=1f3fcca95ad2c90c6dbd7693f5f44038')
      .then(resp => resp.json()).then(json => {
        this.setState({
          loading: false,
          movies: json.results
        });
      });
  }
  render() {
    return (
      <div>
        <Nav menuChange={this.menuChange} menu={this.state.menu}/>
        { this.state.loading ?
          (<div className='loading'> <Spin size="large"/> </div>) :
          (<MovieList movies={this.state.movies}/>)
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
      fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=1f3fcca95ad2c90c6dbd7693f5f44038')
        .then(resp => resp.json()).then(json => {
          this.setState({
            loading: false,
            movies: json.results
          });
        });
    } else {
      const movies = JSON.parse(localStorage.getItem('favs')) || [];
      this.setState({ menu, movies });
    }
  }
}

export default App;
