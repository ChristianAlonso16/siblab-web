import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { RegisterT } from '../services/TeacherService';
import { onFail, onSuccess } from '../../main/utils/Alerts';

const ModalRegisterTeacher = (props) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(4, 'El nombre debe tener al menos 4 caracteres')
                .max(20, 'El nombre no puede tener más de 20 caracteres')
                .matches(/^[a-zA-Z' ]+$/, 'Ingresa un nombre válido')
                .matches(/^[A-Z][a-zÀ-ÖØ-öø-ÿ \'-]*$/, 'El nombre debe empezar con una letra mayúscula')
                .required("Nombre obligatorio"),
            surname: Yup.string()
                .min(4, 'El apellido debe tener al menos 4 caracteres')
                .max(20, 'El apellido no puede tener más de 20 caracteres')
                .matches(/^[a-zA-Z' ]+$/, 'Ingresa un apellido válido')
                .matches(/^[A-Z][a-zÀ-ÖØ-öø-ÿ \'-]*$/, 'El apellido debe empezar con una letra mayúscula')
                .required("Apellido obligatorio"),
            email: Yup.string()
                .email('Ingrese un correo electrónico válido')
                .matches(/^[^\s@]+@utez\.edu\.mx$/, 'El correo debe ser del dominio utez.edu.mx')
                .required('Ingrese su correo electrónico'),
            password: Yup.string().required("Contraseña obligatoria")
        }),
        onSubmit: async (values) => {
            show === false ? setShow(false) : await showConfirmationSwal(values);
        }
    })

    const onTeacher = async (values) => {
        setLoading(true);
        try {
            await RegisterT(values).then(response => {
                response.data.message === "Usuario existente" ? onFail("El docente ya esta registrado") : onSuccess("Docente registrado" && setShow(false))
            }).catch(error => {
                console.log('error desde registerTeacher', error);
                setShow(false);
            })
            props.onTeacher(values.name);
        } catch (error) {
            setLoading(false);
        }
        setLoading(false);
    }
    const showConfirmationSwal = (values) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres registrar el nuevo docente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                await onTeacher(values);
            }
        });
    }

    return (
        <>
            <Button className='btn-md  mb-5' style={{ backgroundColor: " rgb(21 47 71)" }} onClick={handleShow}>
                Registrar Docente
            </Button>
            <Modal className='fade bg-secondary ' size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar docente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form className="row g-3" onSubmit={formik.handleSubmit}>
                            <div className="col-md-6">
                                <label htmlFor="inputName" className="form-label">Nombre(s)</label>
                                <input name='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="form-control" id="inputName" />
                                <div className="error-message">{formik.touched.name && formik.errors.name}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputSurname" className="form-label">Apellido paterno</label>
                                <input name='surname' value={formik.values.surname} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="form-control" id="inputSurname" />
                                <div className="error-message">{formik.touched.surname && formik.errors.surname}</div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">Apellido materno</label>
                                <input type="text" className="form-control" id="inputEmail4" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="inputEmail" className="form-label">Correo electronico</label>
                                <input name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="form-control" id="inputEmail" />
                                <div className="error-message">{formik.touched.email && formik.errors.email}</div>

                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
                                <input name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" id="inputPassword4" />
                                <div className="error-message">{formik.touched.password && formik.errors.password}</div>

                            </div>

                            <div className="col-12 d-flex justify-content-end">
                                {/* <Button disabled={!formik.isValid || formik.isSubmitting} type="submit" className="btn " style={{ backgroundColor: " rgb(21 47 71)" }} >
                                {loading ? "Enviando..." && <FontAwesomeIcon icon={faSpinner} spin  /> : "Registrar docente"}

                            </Button> */}
                            </div>
                    <Modal.Footer>
                        <Button variant="secondary" type='submit' onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button disabled={!formik.isValid || formik.isSubmitting} type="submit" className="btn " style={{ backgroundColor: " rgb(21 47 71)" }} >
                            {loading ? "Enviando..." && <FontAwesomeIcon icon={faSpinner} spin /> : "Registrar docente"}
                        </Button>
                    </Modal.Footer>
                    </form>
                </Modal.Body>

            </Modal>

        </>


    );
};



export default ModalRegisterTeacher;