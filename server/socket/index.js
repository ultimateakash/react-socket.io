const { fetchtActors, fetchMovies } = require('./handler');

module.exports = (io) => {

    io.on('connection', socket => {

        console.log('new connection');

		socket.on('fetchtActors', () => fetchtActors(socket));

        socket.on('fetchMovies', (actor) => fetchMovies(socket, actor));

		socket.on('disconnect', () => console.log('disconnected')); 
		
	});
}