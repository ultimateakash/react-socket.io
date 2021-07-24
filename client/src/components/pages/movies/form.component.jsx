import React, { useContext } from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap"
import ReactStars from "react-rating-stars-component";
import { SocketContext } from '../../../context/socket';
import { useForm, Controller } from 'react-hook-form';
import { categories } from '../../../data'

const FormComponent = (props) => {

    const { show, movie, onClose } = props;
    const socket = useContext(SocketContext);
    const { register, control, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: movie });

    const onSubmit = (data) => {
        if (movie) {
            socket.emit('updateMovie', data);
        } else {
            socket.emit('addMovie', data);
        }
        reset({ rating: 0 });
        onClose(false) // close form modal
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
                                        id="name"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Movie name is required'
                                            },
                                            maxLength: {
                                                value: 15,
                                                message: 'Movie name length should be less then 15'
                                            }
                                        })}
                                    />
                                    {errors.name && <p>{errors.name.message}</p>}
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label htmlFor="category" className="col-sm-2 col-form-label">Category:</label>
                                <div className="col-sm-10">
                                    <select
                                        className="form-control"
                                        id="category"
                                        {...register("category", {
                                            required: {
                                                value: true,
                                                message: 'Movie category is required'
                                            }
                                        })}
                                        defaultValue={''}>
                                        <option value={''}>Select Category</option>
                                        {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
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
                                        rules={{ required: "Rating is required" }}
                                        defaultValue={0}
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
                                <button type="button" onClick={() => onClose(false)} className="btn btn-primary">
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