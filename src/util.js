function storeMovie(movie) {
  let movies = getMovies();
  movies.push(movie);
  setMovies(movies);
}
function removeMovie(movie) {
  let movies = getMovies();
  const id = movies.findIndex(e => e.id === movie.id);
  movies.splice(id, 1);
  setMovies(movies);
}
function getMovies() {
  return JSON.parse(localStorage.getItem('favs')) || [];
}
function setMovies(movies) {
  localStorage.setItem('favs', JSON.stringify(movies));
}

export { storeMovie, removeMovie, getMovies };
