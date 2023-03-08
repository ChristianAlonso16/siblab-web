import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import libro from '../assets/images/libro.png'
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import '../assets/css/login.css';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const LoginComponent = ( {onData} ) => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");

    const onAuth = async (event) => {
        console.log('Hola desde onAuth', username);
        event.preventDefault();
        setLoading(true);
        await onData({ username, password, setLoading, setErrors} );
    }

    // const objectSchema = Yup.object({
    //     username: Yup.string().email("No es un correo valido").required("El correo es obligatorio"),
    //     password: Yup.string().required("La contraseña es obligatoria")
    // })


    return (
        <div className="container py-5 h-100 rounded ">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card shadow" >
                        <div className="row g-0">

                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black" >
                                  
                                        <Form onSubmit={event => onAuth(event)}>
                                            <div className="d-flex align-items-center mb-3 pb-1 justify-content-center">
                                                <i className="fas fa-cubes fa-2x me-3" ><img src={libro} alt="" /></i>
                                                <span className="h1 fw-bold mb-0">Siblab</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3">Inicia sesion</h5>

                                            <Form.Group className="form-outline mb-4" controlId="formBasicEmail">
                                                <Form.Label className="form-label">Correo</Form.Label>
                                                <Form.Control className="form-control form-control-lg" name="username" type="email" placeholder="20213tn050@utez.edu.mx"
                                                    value={username} onChange={text => setUsername(text.target.value)}
                                                />
                                                { errors.username && <div className="alert alert-danger error">{errors.username}</div>}
                                            </Form.Group>

                                            <Form.Group className="form-outline mb-4" controlId="formBasicPassword">
                                                <Form.Label className="form-label">Contraseña</Form.Label>
                                                <Form.Control className="form-control form-control-lg" name="password" type="password" placeholder="*************"
                                                    value={password} onChange={text => setPassword(text.target.value)}
                                                />
                                                {errors.password && <div className="alert alert-danger error">{errors.password}</div>}

                                            </Form.Group>
                                            <div className="pt-1 mb-4 text-center">
                                                <Button className="btn btn-dark btn-lg btn-block" variant="primary" type="submit">
                                                    {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Ingresar"}</Button>
                                            </div>

                                        </Form>
                                 

                                </div>
                            </div>
                            <div className="col-md-6 col-lg-5 d-none d-md-block fondo rounded">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
LoginComponent.propTypes = {
    title: PropTypes.string.isRequired
  }
  
  LoginComponent.defaultProps = {
    title: "Hola mundo"
  }