import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import Loading from '../../main/components/Loading';
import apiUrl from '../../main/utils/AppUrl';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { onFail, onSuccess } from '../../main/utils/Alerts';

const RegisterClassroomComponent = ({ onClassrom }) => {
    const [name, setName] = useState("");
    const [students, setStudents] = useState(0);
    const [career, setCareer] = useState("");
    const [grade, setGrade] = useState("");
    const [period, setPeriod] = useState("")
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const chosePeriod = async () => {
            const response = await apiUrl.get('http://localhost:8080/api-siblab/period/');
            const periodFiltro = response.data.data;
            setOptions(periodFiltro);
            console.log('filtro', periodFiltro);
        }
        chosePeriod();

    }, []);
    const formik = useFormik({
        initialValues:{
            name:"",
            students:0,
            career:"",
            grade:0,
            period:""
        },
        validationSchema:Yup.object().shape({
            name: Yup.string()
            .max(1, 'El nombre solo debe contener una letra')
            .matches(/^[a-zA-Z' ]+$/, 'El nombre solo debe contener una letra')
            .matches(/^[A-Z][a-zÀ-ÖØ-öø-ÿ \'-]*$/, 'El nombre debe empezar con una letra mayúscula')
            .required("Nombre obligatorio"),
            students:Yup.number()
            .max(30,"El numero maximo es 30")
            .required("Cantida obligatoria"),
            career: Yup.string().matches("").required("Carrera requerida"),
            grade:Yup.number()
            .max(11,"El grado maximo es 11")
            .min(1,"Grado minimo 1")
            .required("Grado requerido"),
            period:Yup.string().required("Periodo requerido")        
        }),
        onSubmit: async (values) =>{
await showConfirmationSwal(values);
        }
    })
     const showConfirmationSwal = (values) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres registrar el nuevo grupo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                await onClass(values);
            }
        });
    }
    const onClass = async (values) => {
        console.log("onLClass",values);
        setLoading(true);
        try {
         onClassrom(values);
         onSuccess("Grupo registrado");

        } catch (error) {
            setLoading(false);
            onFail("Operacion invalida");
        }
        setLoading(false);
       
    }
    return (
        <div className="p-5 mt-2 container" style={{ marginLeft: "300px" }}>
            <div style={{ backgroundColor: "green", width: "850px", height: "30px", marginLeft: "97px" }}></div>
            <div className="container-md p-5 bg-white   shadow-lg" style={{ width: "850px" }} >
                <div className="p-5 ">
                    <form className="row g-3 " onSubmit={formik.handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input value={formik.values.name} name="name"  onBlur={formik.handleBlur} maxLength={1} onChange={formik.handleChange} type="text" className="form-control" id="name" />
                            <div className="error-message">{formik.touched.name&&  formik.errors.name }</div>

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaInicio" className="form-label">Numero de estudianates</label>
                            <input value={formik.values.students} name="students"  onBlur={formik.handleBlur} onChange={formik.handleChange} type="number" className="form-control" id="fechaInicio" />
                            <div className="error-message">{formik.touched.students&&  formik.errors.students }</div>

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaFin" className="form-label">Grado</label>
                            <input value={formik.values.grade} name="grade"  onBlur={formik.handleBlur} onChange={formik.handleChange} type="number" className="form-control" id="fechaFin" />
                            <div className="error-message">{formik.touched.grade&&  formik.errors.grade }</div>

                        </div>

                        <div className="col-md-6">
                            <label htmlFor="selectGrade" className="form-label">Asignar Carrera</label>
                            <select className="form-select" value={formik.values.career}  onBlur={formik.handleBlur} name="career" aria-label="Default select example " id="selectGrade" onChange={formik.handleChange}>
                                <option value>Asignar grado...</option>
                                <option value="Tsu Desarrollo de Sotware">Tsu Desarrollo de Sotware</option>
                                <option value="Lic Administracion">Lic Administracion </option>
                                <option value="Tsu Redes">Tsu Redes</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="selectPeriod" className="form-label">Asignar docente</label>
                            <select className="form-select" aria-label="Default select example "  onBlur={formik.handleBlur} name='period' id="selectPeriod" value={formik.values.period} onChange={formik.handleChange}>
                                <option value>Asignar periodo...</option>
                                {options.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.semester} {""} {option.user.name} {""} {option.user.surname}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="col-12 d-flex justify-content-end">
                            <Button  disabled={!formik.isValid || formik.isSubmitting} type="submit" className="btn " style={{ backgroundColor: " rgb(21 47 71)" }}>
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Registrar grupo"}
                            </Button>                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default RegisterClassroomComponent
RegisterClassroomComponent.propTypes = {
    title: PropTypes.string.isRequired
}

RegisterClassroomComponent.defaultProps = {
    title: "Hola mundo"
}