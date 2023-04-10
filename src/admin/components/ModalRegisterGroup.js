import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { RegisterC } from '../services/ClassroomService';
import Loading from '../../main/components/Loading';

const ModalRegisterGroup = () => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    
    const formik = useFormik({
        initialValues: {
            name: "",
            students: 0,
            career: "",
            grade: "",
            level: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .max(1, 'El nombre solo debe contener una letra')
                .matches(/^[a-zA-Z' ]+$/, 'El nombre solo debe contener una letra')
                .matches(/^[A-Z][a-zÀ-ÖØ-öø-ÿ \'-]*$/, 'El nombre debe empezar con una letra mayúscula')
                .required("Nombre obligatorio"),
            students: Yup.number()
                .max(30, "El numero maximo es 30")
                .required("Cantida obligatoria"),
            career: Yup.string().matches("").required("Carrera requerida"),
            grade: Yup.number()
                .max(11, "El grado maximo es 11")
                .min(1, "Grado minimo 1")
                .required("Grado requerido"),
            level: Yup.string().matches("").required("Nivel académico requerido")
        }),
        onSubmit: async (values) => {
            console.log(values)
            const {career, grade, level, name, students} = values;
            const data ={
                name,
                total_students: students,
                grade,
                career: level + career
            }
            await showConfirmationSwal(data);
        }
    })
    
    
    const showConfirmationSwal = (values) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres registrar este grupo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                setLoading(true);
                await RegisterC(values);
                setLoading(false);
            }
        });
    }
   
    if (loading) return <Loading />

    return (
        <>
            <Button className='btn-md  mb-5' style={{ backgroundColor: " rgb(21 47 71)" }} onClick={handleShow}>
                Registrar grupo
            </Button>
            <Modal className='fade bg-secondary ' size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="row g-3 " onSubmit={formik.handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input value={formik.values.name} name="name" onBlur={formik.handleBlur} maxLength={1} onChange={formik.handleChange} type="text" className="form-control" id="name" />
                            <div className="error-message">{formik.touched.name && formik.errors.name}</div>

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaInicio" className="form-label">Numero de estudiantes</label>
                            <input value={formik.values.students} name="students" onBlur={formik.handleBlur} onChange={formik.handleChange} type="number" className="form-control" id="fechaInicio" />
                            <div className="error-message">{formik.touched.students && formik.errors.students}</div>

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="selectGrado" className="form-label">Asignar grado</label>
                            <select className="form-select" aria-label="Default select example " onBlur={formik.handleBlur} name='grade' id="selectGrado" value={formik.values.grade} onChange={formik.handleChange}>
                                <option value>Asignar grado...</option>
                                <option value={1}>1°Cuatrimestre</option>
                                <option value={2}>2°Cuatrimestre</option>
                                <option value={3}>3°Cuatrimestre</option>
                                <option value={4}>4°Cuatrimestre</option>
                                <option value={5}>5°Cuatrimestre</option>
                                <option value={6}>6°Cuatrimestre</option>
                                <option value={7}>7°Cuatrimestre</option>
                                <option value={8}>8°Cuatrimestre</option>
                                <option value={9}>9°Cuatrimestre</option>
                                <option value={10}>10°Cuatrimestre</option>
                                <option value={11}>11°Cuatrimestre</option>
                            </select>
                            <div className="error-message">{formik.touched.grade && formik.errors.grade}</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="selectPeriod" className="form-label">Nivel académico</label>
                            <select className="form-select" aria-label="Default select example " onBlur={formik.handleBlur} name='level' id="selectPeriod" value={formik.values.level} onChange={formik.handleChange}>
                                <option value={""}>Asignar nivel académico...</option>
                                <option value={'Tsu. '}>Técnico superior universitario</option>
                                <option value={'Ing. '}>Ingeniería</option>
                                <option value={'Lic. '}>Licenciatura</option>
                                
                            </select>
                            <div className="error-message">{formik.touched.level && formik.errors.level}</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="selectGrade" className="form-label">Asignar Carrera</label>
                            <select className="form-select" value={formik.values.career} onBlur={formik.handleBlur} name="career" aria-label="Default select example " id="selectGrade" onChange={formik.handleChange}>
                                <option value>Asignar carrera...</option>
                                <option value="Desarrollo de Sotware">Desarrollo de Sotware</option>
                                <option value="Diseño digital">Diseño digital </option>
                                <option value="Redes">Redes</option>
                                <option value="Mecatrónica">Mecatrónica</option>
                                <option value="Contaduría">Contaduría</option>
                                <option value="Administración">Administración</option>
                            </select>
                            <div className="error-message">{formik.touched.career && formik.errors.career}</div>
                        </div>
                        

                        <Modal.Footer>
                        <Button variant="secondary" type='submit' onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button disabled={!formik.isValid || formik.isSubmitting} type="submit"  className="btn " style={{ backgroundColor: " rgb(21 47 71)" }} >
                            {loading ? "Enviando..." && <FontAwesomeIcon icon={faSpinner} spin /> : "Registrar grupo"}
                        </Button>
                    </Modal.Footer>  
                    </form>
                </Modal.Body>

            </Modal>

        </>

    )
}

export default ModalRegisterGroup