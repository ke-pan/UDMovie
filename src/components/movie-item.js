import React from 'react';
import moment from 'moment';
import { Icon } from 'antd';
import './movie-item.css';

function MovieItem(props) {
  return(
    <div className='movie-item'>
      <img
        src={'https://image.tmdb.org/t/p/w500' + props.movie.poster_path}
        width="100%"
        role="presentation"
      />
      <div className='content'>
        <h2> {props.movie.title} </h2>
        <date> { moment(props.movie.release_date).format('MMMM Do YYYY') } </date>
        <div className="fav">
          { props.movie.fav ?
            (<Icon type="heart" />) :
            (<Icon type="heart-o" />)
          }
        </div>
      </div>
    </div>
  );
}

export default MovieItem;
