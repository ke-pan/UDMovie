import React from 'react';
import MovieItem from './movie-item';
import { Row, Col } from 'antd';

function MovieList(props) {
  const movieItems = props.movies.map((result) => {
    return(
      <Col xs={24} sm={12} md={6} key={result.id}>
        <MovieItem movie={result} toggleFav={props.toggleFav}/>
      </Col>
    );
  })
  return(
    <Row type="flex" justify="center" align="top">
      {movieItems}
    </Row>
  );
}

export default MovieList;
