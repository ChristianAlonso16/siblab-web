import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import apiUrl from '../../main/utils/AppUrl';
import Swal from 'sweetalert2';
import { onFail, onSuccess } from '../../main/utils/Alerts';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { differenceInCalendarMonths } from 'date-fns';

const RegisterQuaterComponent = ({ onQuarter }) => {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);


    useEffect(() => {
        const choseTeacher = async () => {
            const response = await apiUrl.get('http://localhost:8080/api-siblab/user/');
            const docenteFiltro = response.data.data;
            const filteredTeacher = docenteFiltro.filter(objeto => objeto.role === 'Teacher');
            setOptions(filteredTeacher);
            console.log('filtro', filteredTeacher);
        }
        choseTeacher();

    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            fechaInicio: "",
            fechaFin: "",
            docente: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.number()
                .max(11, "El semestre maximo es 11")
                .min(1, "Semestre minimo 1")
                .required("Nombre requerido"),
            docente: Yup.string().required("Docente requerido"),
            fechaInicio: Yup.date().required('La fecha de inicio es requerida'),
            fechaFin: Yup.date()
              .required('La fecha de fin es requerida')
              .test('fechaFin', 'La fecha de fin debe ser mayor', function(value) {
                const fechaInicio = this.parent.fechaInicio;
                if (!fechaInicio || !value) {
                  return true; // si uno de los campos está vacío, no se realiza la validación
                }
                const diffInMonths = (new Date(value).getFullYear() - new Date(fechaInicio).getFullYear()) * 12 + new Date(value).getMonth() - new Date(fechaInicio).getMonth();
                return diffInMonths >= 3;
              })
               .test(
                'date-range',
                'El período máximo entre fechas es de 4 meses',
                function(value) {
                  const { fechaInicio } = this.parent;
                  const diffInMonths = differenceInCalendarMonths(
                    new Date(value),
                    new Date(fechaInicio)
                  );
                  return diffInMonths <= 3;
                }
              ),
          
        }),
        onSubmit: async (values) => {
            await showConfirmationSwal(values)
        }
    })

    const onQuart = async (values) => {
        console.log(values);
        setLoading(true);
        try {
            await onQuarter(values);
        } catch (error) {
            setLoading(false);
        }
        setLoading(false);
    }
    const showConfirmationSwal = (values) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres registrar el nuevo periodo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                await onQuart(values);
            }
        });
    }
    return (
        <div className="p-5 mt-5 container" style={{ marginLeft: "300px" }}>
            <div style={{ backgroundColor: "green", width: "850px", height: "30px", marginLeft: "97px" }}></div>
            <div className="container-md p-5 bg-white   shadow-lg" style={{ width: "850px" }} >
                <div className="p-5 ">
                    <form className="row g-3 " onSubmit={formik.handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Semestre</label>
                            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" name='name' className="form-control" id="name" />
                            <div className="error-message">{formik.touched.name && formik.errors.name}</div>

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaInicio" className="form-label">Fecha de inicio</label>
                            <input value={formik.values.fechaInicio} onChange={formik.handleChange} onBlur={formik.handleBlur} name="fechaInicio" type="date" className="form-control" id="fechaInicio" />
                            <div className="error-message">{formik.touched.fechaInicio && formik.errors.fechaInicio}</div>

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaFin" className="form-label">Fecha fin</label>
                            <input value={formik.values.fechaFin} onChange={formik.handleChange} onBlur={formik.handleBlur} name="fechaFin" type="date" className="form-control" id="fechaFin" />
                            <div className="error-message">{formik.touched.fechaFin && formik.errors.fechaFin}</div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="selectGroup" className="form-label">Asignar docente</label>
                            <select className="form-select" id="selectGroup" value={formik.values.docente} onBlur={formik.handleBlur} name="docente" onChange={formik.handleChange}>
                                <option value>Asignar docente...</option>
                                {options.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name} {""} {option.surname}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="col-12 d-flex justify-content-end">
                            <Button  disabled={!formik.isValid || formik.isSubmitting } type="submit" className="btn" style={{ backgroundColor: "rgb(21 47 71)" }}>
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Registrar cuatrimestre"}
                            </Button>                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default RegisterQuaterComponent
RegisterQuaterComponent.propTypes = {
    title: PropTypes.string.isRequired
}

RegisterQuaterComponent.defaultProps = {
    title: "Hola mundo"
}