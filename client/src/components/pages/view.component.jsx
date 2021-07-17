import React from 'react'; 
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap" 

const ViewComponent = ({ show, actor, onClose }) => {

    return (
        <Modal isOpen={show} size="md">
            <ModalHeader tag="h4">
                Movies: {actor.name}
            </ModalHeader>
            <ModalBody>   
                <Row>
                    <Col>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {
                                actor.movies && actor.movies.map((movie, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{movie.id}</th>
                                            <td>{movie.name}</td>  
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    </Col>
                </Row>    
                <Row>
                    <Col>
                        <div className="text-end mt-3">
                            <button type="button" onClick={() => onClose(false)} className="btn btn-primary save-user">
                                Close
                            </button>
                        </div>
                    </Col>
                </Row> 
            </ModalBody>
        </Modal>
    );
}

export default ViewComponent;