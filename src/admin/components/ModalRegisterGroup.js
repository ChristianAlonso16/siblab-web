import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import apiUrl from '../../main/utils/AppUrl';
import { RegisterC } from '../services/ClassroomService';
const ModalRegisterGroup = (props) => {
    const [loading, setLoading] = useState(false);
    const [docentes, setDocente] = useState([]);
    const [grades, setGrade] = useState([]) ;   
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    useEffect(() => {
        const choseTeacher = async () => {
            const response = await apiUrl.get('http://localhost:8080/api-siblab/user/');
            const docenteFiltro = response.data.data;
            const filteredTeacher = docenteFiltro.filter(objeto => objeto.role === 'Teacher');
            setDocente(filteredTeacher);
            console.log('filtro', filteredTeacher);
        }
        choseTeacher();

    }, []);
    useEffect(() => {
        const choseGrade = async () => {
            const response = await apiUrl.get('http://localhost:8080/api-siblab/semester/');
            setGrade(response.data.data);
        }
        choseGrade();

    }, []);
    const formik = useFormik({
        initialValues: {
            name: "",
            students: 0,
            career: "",
            grade: "",
            docente: ""
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
            docente: Yup.string().required("Docente requerido")
        }),
        onSubmit: async (values) => {
            console.log(values)
            setLoading(true);
            try {
                const period = {
                    semester:{ id:values.grade},
                    user_id: { id: values.docente },
                }
                const response = await apiUrl.post('http://localhost:8080/api-siblab/period/', period)
                const idPeriod = response.data.data.id;
                console.log("Periodo",response)
                show === false ? setShow(false) : await showConfirmationSwal({values,idPeriod});
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
            setLoading(false);

        }
    })
    const onGroup = async (values) => {
        console.log("onLClass", values);
        setLoading(true);
        try {
            setShow(false);
           await RegisterC(values);
            props.sortData(values.values.career)

        } catch (error) {
            setLoading(false);
        }
        setLoading(false);

    }
    
    const showConfirmationSwal = ({values,idPeriod}) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres registrar el nuevo grupo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                await onGroup({values,idPeriod});
            }
        });
    }
   

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
                                {grades.map(grade => (
                                    <option key={grade.id} value={grade.id}>
                                        {grade.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="col-md-6">
                            <label htmlFor="selectGrade" className="form-label">Asignar Carrera</label>
                            <select className="form-select" value={formik.values.career} onBlur={formik.handleBlur} name="career" aria-label="Default select example " id="selectGrade" onChange={formik.handleChange}>
                                <option value>Asignar carrera...</option>
                                <option value="Tsu Desarrollo de Sotware">Tsu Desarrollo de Sotware</option>
                                <option value="Lic Administracion">Lic Administracion </option>
                                <option value="Tsu Redes">Tsu Redes</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="selectPeriod" className="form-label">Asignar docente</label>
                            <select className="form-select" aria-label="Default select example " onBlur={formik.handleBlur} name='docente' id="selectPeriod" value={formik.values.docente} onChange={formik.handleChange}>
                                <option value>Asignar docente...</option>
                                {docentes.map(docente => (
                                    <option key={docente.id} value={docente.id}>
                                        {docente.name} {""} {docente.surname}
                                    </option>
                                ))}
                            </select>
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