import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { SocketContext } from '../../../context/socket';
import FormComponent from './form.component';

const ListComponent = () => {

    const socket = useContext(SocketContext);

    const [movies, setMovies] = useState([]);
    const [movieDetail, setMovieDetail] = useState(null);
    const [modal, setModal] = useState(false); 

    useEffect(() => {
        socket.emit('fetchMovies');
        socket.on('fetchMovies', setMovies); 

        return () => socket.disconnect();
    }, [])

    const handleModal = (movie) => {  
        if(movie) {
            setMovieDetail(movie)
        }
        setModal(true);
    }

    const handleDelete = (movie) => {
        socket.emit('deleteMovie', movie.id);
    }

    const handleClose = () => { 
        setModal(false);
        setMovieDetail(null)
    }

    return (
        <>
            <Row>
                <Col className="mb-1 mt-1 text-end" md={{ size: 8, offset: 2 }}>
                    <button className="btn btn-primary btn-sm" onClick={() => handleModal()}>Add Movie</button>
                </Col>
            </Row>
            <Row>
                <Col md={{ size: 8, offset: 2 }}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                movies.map((movie, i) => {
                                    return (
                                        <tr key={i}>
                                            <th>{movie.id}</th>
                                            <td>{movie.name}</td>
                                            <td>{movie.category}</td>
                                            <td><span className="badge bg-warning text-dark">{movie.rating}</span></td>
                                            <td>
                                                <button className="btn btn-primary btn-sm me-2" onClick={() => handleModal(movie)}>Edit</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(movie)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {
                        modal 
                        && 
                        <FormComponent 
                            show={modal} 
                            movie={movieDetail} 
                            onClose={handleClose}
                        />
                    }
                </Col>
            </Row>
        </>
    );
}

export default ListComponent;