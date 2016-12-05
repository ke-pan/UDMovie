import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import App from './App';
import { getMovies } from './util';
import './index.css';
import 'antd/dist/antd.css';



function checkFavs() {
  if ( 7 < moment().hour() && moment().hour() < 22) {
    const movies = getMovies();
    movies.forEach(function(movie) {
      if (movie.book_date === moment().format('YYYY-MM-DD') && !movie.cancel_notify) {
        createNotification(movie);
      }
    })
  }
}

function createNotification(movie) {
  // Let's check if the browser supports notifications
    if (!window.Notification) {
      console.log("This browser does not support notifications.");
    }

    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification

      const img = 'https://image.tmdb.org/t/p/w154' + movie.poster_path;
      const text = `HEY! Don't forget to watch "${movie.title}"`;
      new Notification('Time to relax', {
        body: text,
        icon: img,
        tag: movie.title,
        data: movie.id
      });

    }

    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {

        // Whatever the user answers, we make sure Chrome stores the information
        if(!('permission' in Notification)) {
          Notification.permission = permission;
        }

        // If the user is okay, let's create a notification
        if (permission === "granted") {
          const img = 'https://image.tmdb.org/t/p/w154' + movie.poster_path;
          const text = `HEY! Don't forget to watch "${movie.title}"`;
          new Notification('Time to relax', {
            body: text,
            icon: img,
            tag: movie.title,
            data: movie.id
          });

        }
      });
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// check fav movies every hour for notification
setInterval(checkFavs, 3600000);
// setInterval(checkFavs, 10000);
