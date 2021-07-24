const { Movie } = require('../models')
const { logError } = require('../utils') 

const fetchMovies = (socket) => {
    Movie.findAll()
        .then(movies => socket.emit('fetchMovies', movies))
        .catch(logError)
}

const addMovie = (socket, data) => {
    Movie.create(data)
        .then(() => fetchMovies(socket)) // fetch updated movies
        .catch(logError)
}

const updateMovie = (socket, data) => {
    Movie.update(data, {
        where: { id: data.id }
    })
        .then(() => fetchMovies(socket)) // fetch updated movies
        .catch(logError)
}

const deleteMovie = (socket, id) => {
    Movie.destroy({
        where: { id }
    })
        .then(() => fetchMovies(socket)) // fetch updated movies
        .catch(logError)
}

module.exports = {
    fetchMovies,
    updateMovie,
    deleteMovie,
    addMovie
}