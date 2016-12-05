import React from 'react';
import moment from 'moment';
import { Icon, DatePicker } from 'antd';
import './movie-item.css';

// const style = {
//   // position: 'fixed'
//   left: '10px'
// };

const MovieItem = React.createClass({
  getInitialState() {
    return { date_picking: false }
  },
  render() {
    let date_pikcer = this.state.date_picking ? <div className="date-picker">
                                                  <DatePicker
                                                    onChange={this.pickDate}
                                                    open={true}
                                                    disabledDate={ date => date < moment() }
                                                    placeholder="Pick a day to watch"/>
                                                </div> : null
    return(
      <div className='movie-item'>
        <img
          src={'https://image.tmdb.org/t/p/w500' + this.props.movie.poster_path}
          width="100%"
          role="presentation"
        />
        <div className='content'>
          <h2> {this.props.movie.title} </h2>
          <div className="date">
            <label>release at: </label>
            <date> { moment(this.props.movie.release_date).format('MMMM Do YYYY') } </date>
          </div>
          <div className="fav" onClick={this.handleClick}>
            { this.props.movie.fav ?
              (<Icon type="heart" />) :
              (<Icon type="heart-o" />)
            }
          </div>
        </div>
        { date_pikcer }
      </div>
    );
  },
  handleClick() {
    if (this.props.movie.fav) {
      this.props.clearFav(this.props.movie);
    } else {
      this.setState({ date_picking: true });
    }
  },
  pickDate(date, dateString) {
    this.setState({ date_picking: false });
    this.props.setFav(this.props.movie, dateString);
  }
});

export default MovieItem;
