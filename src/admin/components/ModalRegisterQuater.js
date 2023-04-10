import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { differenceInCalendarMonths } from 'date-fns';
import { RegisterQ } from '../services/QuarterService';
import Loading from '../../main/components/Loading';

const ModalRegisterQuater = (props) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const formik = useFormik({
        initialValues: {
            name: "",
            fechaInicio: "",
            fechaFin: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required("Nombre requerido"),
            fechaInicio: Yup.date().required('La fecha de inicio es requerida'),
            fechaFin: Yup.date()
                .required('La fecha de fin es requerida')
                .test('fechaFin', 'La fecha de fin debe ser mayor', function (value) {
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
                    function (value) {
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
            show === false ? setShow(false) : await showConfirmationSwal(values);
        }
    })

    const onQuart = async (values) => {
        setLoading(true);
        try {
            setShow(false);
           await RegisterQ(values);
           setTimeout(() => {
            setLoading(false);
            window.location.reload();
        }, 3000);
           props.sortData(values.name)
        } catch (error) {
            setLoading(false);
        }
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
    if (loading) return <Loading />

    return (
        <>
            <Button className='btn-md  mb-5' style={{ backgroundColor: " rgb(21 47 71)" }} onClick={handleShow}>
                Registrar cuatrimestre
            </Button>
            <Modal className='fade bg-secondary ' size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar cuatrimestre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3 " onSubmit={formik.handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Cuatrimestre</label>
                            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name='name' className="form-control" id="name" />
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
                        <Modal.Footer>
                        <Button variant="secondary" type='submit' onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button disabled={!formik.isValid || formik.isSubmitting} type="submit"  className="btn " style={{ backgroundColor: " rgb(21 47 71)" }} >
                            {loading ? "Enviando..." && <FontAwesomeIcon icon={faSpinner} spin /> : "Registrar cuatrimestre"}
                        </Button>
                    </Modal.Footer>            
                    </form>
                </Modal.Body>

            </Modal>

        </>

    )
}

export default ModalRegisterQuater