import React from 'react';
import moment from 'moment';
import { Icon } from 'antd';
import './movie-item.css';

const MovieItem = React.createClass({
  // getInitialState() {
  //   return { fav: this.props.movie.fav }
  // },
  render() {
    return(
      <div className='movie-item'>
        <img
          src={'https://image.tmdb.org/t/p/w500' + this.props.movie.poster_path}
          width="100%"
          role="presentation"
        />
        <div className='content'>
          <h2> {this.props.movie.title} </h2>
          <date> { moment(this.props.movie.release_date).format('MMMM Do YYYY') } </date>
          <div className="fav" onClick={this.handleClick}>
            { this.props.movie.fav ?
              (<Icon type="heart" />) :
              (<Icon type="heart-o" />)
            }
          </div>
        </div>
      </div>
    );
  },
  handleClick() {
    this.props.toggleFav(this.props.movie)
  }
});

export default MovieItem;
