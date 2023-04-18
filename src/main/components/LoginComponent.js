import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import libro from '../assets/images/libro.png'
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import '../assets/css/login.css';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { onFail } from "../utils/Alerts";

export const LoginComponent = ( {onData} ) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
const formik = useFormik({
    initialValues:{
        username:"",
        password:""
    },
    validationSchema:Yup.object().shape({
        username: Yup.string()
        .email('Ingrese un correo electrónico válido')
        .matches(/^[^\s@]+@utez\.edu\.mx$/, 'El correo debe ser del dominio utez.edu.mx')
        .required('Ingrese su correo electrónico'),
        password: Yup.string().required("Contraseña obligatoria")
        }),
        onSubmit: async(values)=>{
            console.log("Values",values);
            await onAuth(values);
        }
})
    const onAuth = async (values) => {
        console.log('Hola desde onAuth', values);
        setLoading(true);
        try {
            await onData(values);

        } catch (error) {
            setLoading(false);
            onFail("Usuario o contraseña incorrectos");
        }
        setLoading(false);
    }

    return (
        <div className="container mt-4 h-100 rounded ">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card shadow-lg" >
                        <div className="row g-0">

                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black" >
                                  
                                        <Form onSubmit={formik.handleSubmit}>
                                            <div className="d-flex align-items-center mb-3 pb-1 justify-content-center">
                                                <i className="fas fa-cubes fa-2x me-3" ><img src={libro} alt="" /></i>
                                                <span className="h1 fw-bold mb-0">Siblab</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3">Inicia sesion</h5>

                                            <Form.Group className="form-outline mb-4" controlId="formBasicEmail">
                                                <Form.Label className="form-label">Correo</Form.Label>
                                                <Form.Control className="form-control form-control-lg" name="username" type="email" placeholder="20213tn050@utez.edu.mx"
                                                    value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.username && formik.errors.username && <div className="error-message">{formik.errors.username}</div>}
                                            </Form.Group>

                                            <Form.Group className="form-outline mb-4" controlId="formBasicPassword">
                                                <Form.Label className="form-label">Contraseña</Form.Label>
                                                <Form.Control className="form-control form-control-lg" name="password" type="password" placeholder="*************"
                                                    value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.password && formik.errors.password && <div className="error-message" >{formik.errors.password}</div>}

                                            </Form.Group>
                                            <div className="pt-1 mb-4 text-center">
                                                <Button  disabled={!formik.isValid || formik.isSubmitting} className="btn btn-dark btn-lg btn-block" variant="primary" type="submit">
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