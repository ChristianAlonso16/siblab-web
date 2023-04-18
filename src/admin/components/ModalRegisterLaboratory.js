import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Loading from '../../main/components/Loading';
import { onFail, onSuccess } from '../../main/utils/Alerts';
import { CreateLaboratory } from '../services/CreateLaboratory';

const ModalRegisterLaboratory = ({idBuilding}) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required("Nombre obligatorio"),
            description: Yup.string()
                .required("Descripción obligatoria"),
        }),
        onSubmit: async (values) => {
            console.log(values)
            const {description, name} = values;
            const data ={
                name,
                description,
                status: true,
                building: {id: idBuilding}
            }
            console.log(data);
            await showConfirmationSwal(data);
        }
    })
    
    
    const showConfirmationSwal = (values) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres registrar este laboratorio?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                setLoading(true);
                const response = await CreateLaboratory(values);
                if (response === 'ERROR'){
                    onFail('Ocurrió un error al registrar');
                }else
                    onSuccess('Laboratorio creado correctamente');

                setLoading(false);
                handleClose();
            }
        });
    }
   
    if (loading) return <Loading />

    return (
        <>
            <button onClick={handleShow} className='form-control text-white' style={{backgroundColor: "rgb(21 47 71)", maxWidth:'200px', right:'100px', position:'absolute'}}>
                Insertar laboratorio
            </button>
            <Modal className='fade bg-secondary ' size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar laboratorio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="row g-3 " onSubmit={formik.handleSubmit}>

                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input value={formik.values.name} name="name" onBlur={formik.handleBlur}  onChange={formik.handleChange} type="text" className="form-control" id="name" />
                        <div className="error-message">{formik.touched.name && formik.errors.name}</div>

                    </div>
                    
                    <div className="col-md-6">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <textarea rows={1} value={formik.values.description} name="description" onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="form-control" id="description" />
                        <div className="error-message">{formik.touched.description && formik.errors.description}</div>

                    </div>
                        

                        <Modal.Footer>
                        <Button variant="secondary" type='submit' onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button disabled={!formik.isValid || formik.isSubmitting} type="submit"  className="btn " style={{ backgroundColor: " rgb(21 47 71)" }} >
                            {loading ? "Enviando..." && <FontAwesomeIcon icon={faSpinner} spin /> : "Registrar laboratorio"}
                        </Button>
                    </Modal.Footer>  
                    </form>
                </Modal.Body>

            </Modal>

        </>

    )
}

export default ModalRegisterLaboratory