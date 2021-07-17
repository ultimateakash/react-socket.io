// Dummy Actors
const actors = [
    { id: 1, name: 'Christian Bale', age: '47 years' },
    { id: 2, name: 'Hugh Jackman', age: '52 years' },
    { id: 3, name: 'Johnny Depp', age: '58 years' },
    { id: 4, name: 'Daniel Radcliffe', age: '31 years' }
]

// Dummy User Movies
const movies = [
    { id: 1, actor_id: 1, name: 'The Dark knight' },
    { id: 2, actor_id: 1, name: 'Ford vs Ferrari' },
    { id: 3, actor_id: 2, name: 'Van Helsing' },
    { id: 4, actor_id: 2, name: 'Logan' },
    { id: 5, actor_id: 3, name: 'Pirates Of The Caribbean' },
    { id: 6, actor_id: 3, name: 'The Tourist' },
    { id: 7, actor_id: 4, name: 'Harry Potter' },
    { id: 8, actor_id: 4, name: 'Escape From Pretoria ' }
]

const fetchtActors = (socket) => { 
    socket.emit('fetchtActors', actors);
}

const fetchMovies = (socket, actor) => {
    const filteredMovies = movies.filter(movie => movie.actor_id == actor.id);
    actor.movies = filteredMovies; 
    socket.emit('fetchMovies', actor);
}

module.exports = {
    fetchtActors,
    fetchMovies
}