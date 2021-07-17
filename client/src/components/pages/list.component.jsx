import React, { useContext, useEffect, useState } from 'react';  
import { SocketContext } from '../../context/socket';
import ViewComponent from './view.component';

const ListComponent = () => {

    const socket = useContext(SocketContext); 

    const [actors, setActors] = useState([]);
    const [modal, setModal] = useState(false);
    const [actor, setActor] = useState(null);

    useEffect(() => { 
        socket.emit('fetchtActors');
        socket.on('fetchtActors', setActors);
        socket.on('fetchMovies', (actor) => handleMovies(actor));
        
        return () => socket.disconnect();
    }, [])

    const fetchMovies = (actor) => { 
        socket.emit('fetchMovies', actor);
    }

    const handleMovies = (actor) => { 
        setActor(actor);
        setModal(true);
    }

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        actors.map((actor, index) => {
                            return (
                                <tr key={index}>
                                    <th>{actor.id}</th>
                                    <td>{actor.name}</td>
                                    <td>{actor.age}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" onClick={() => fetchMovies(actor)}>View</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {  modal  && <ViewComponent show={modal} actor={actor} onClose={setModal}/> }   
        </>
    );
}

export default ListComponent;