import React, { useContext } from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap"
import ReactStars from "react-rating-stars-component";
import { SocketContext } from '../../../context/socket';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { categories } from '../../../data';

const FormComponent = (props) => {

    const { show, movie, onClose } = props;
    const socket = useContext(SocketContext);
    
    const validations = {
        name: Yup.string().max(15).required(),
        category: Yup.string().required(),
        rating: Yup.string().required()
    }
    const validationSchema = Yup.object().shape(validations);

    const { register, control, handleSubmit, formState: { errors } } = useForm({ 
        defaultValues: movie,
        resolver: yupResolver(validationSchema) 
    });

    const onSubmit = (data) => {  
        if (movie) {
            socket.emit('updateMovie', data);
        } else {
            socket.emit('addMovie', data);
        } 
        onClose() // close modal
    }

    return (
        <Modal isOpen={show} size="md">
            <ModalHeader tag="h4">
                {movie ? 'Edit' : 'Add'} Movie
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group row mb-3">
                                <label htmlFor="name" className="col-sm-2 col-form-label">Movie:</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter movie name" 
                                        {...register("name")}
                                    />
                                    {errors.name && <p>{errors.name.message}</p>}
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label htmlFor="category" className="col-sm-2 col-form-label">Category:</label>
                                <div className="col-sm-10">
                                    <select
                                        className="form-control" 
                                        {...register("category")}>
                                        <option value={''}>Select Category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p>{errors.category.message}</p>}
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label htmlFor="rating" className="col-sm-2 col-form-label">Rating:</label>
                                <div className="col-sm-10">
                                    <Controller
                                        control={control}
                                        name="rating"  
                                        render={({ field: { onChange, value } }) => (
                                            <ReactStars
                                                onChange={onChange}
                                                size={30}
                                                count={10}
                                                color="grey"
                                                activeColor="#FC7D01"
                                                value={value}
                                                isHalf={true}
                                            />
                                        )}
                                    />
                                    {errors.rating && <p>{errors.rating.message}</p>}
                                </div>
                            </div>
                            <div className="text-end mt-3">
                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button type="button" onClick={onClose} className="btn btn-primary">
                                    Close
                                </button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
}

export default FormComponent;