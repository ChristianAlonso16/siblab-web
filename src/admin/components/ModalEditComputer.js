import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import apiUrl from '../../main/utils/AppUrl';
import Loading from '../../main/components/Loading';
import { AiFillEdit } from 'react-icons/ai';
import { EditMachine } from '../services/InventoryServices';
import { onFail, onSuccess } from '../../main/utils/Alerts';
const ModalEditComputer = (props) => {
    const { computer } = props;
    const id = computer.id;
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [options, setOptions] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState("");
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        formik.setValues({
            name: computer?.name || "",
            brand: computer?.brand || "",
            hard_disk: computer?.hard_disk || "",
            cpu: computer?.cpu || "",
            specific_features: computer?.specific_features || "",
            aula: computer?.laboratory.name || ""

        });
        const choseAula = async () => {
            const choose = await apiUrl.get('/laboratory/');
            setOptions(choose.data.data);
        }
        choseAula();

    }, [computer]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile)
        const imageURL = URL.createObjectURL(selectedFile);
        setImageUrl(imageURL);
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            brand: "",
            hard_disk: "",
            cpu: "",
            specific_features: "",
            aula: ""

        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required("Nombre obligatorio"),
            brand: Yup.string().required("Marca requerida"),
            hard_disk: Yup.string().required("Capacidad requerida"),
            cpu: Yup.string().required("Cpu requerida"),
            specific_features: Yup.string().required("Descripcion requerida"),
            aula: Yup.string().required("Ubicacion requerida")
        }),
        onSubmit: async (values) => {
            show === false ? setShow(false) : await showConfirmationSwal(values);
        }
    })
    const onMachine = async (values) => {
        setLoading(true);
        try {
            await EditMachine({ values, image, id })
            onSuccess("Computadora actualizada")
            setShow(false)
            setTimeout(() => {
                setLoading(false);
                window.location.reload();
            }, 3000);
        } catch (error) {
            setShow(false);
            onFail("Fallo la operacion")
            setLoading(false)
        }
    }


    const showConfirmationSwal = (values) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres actualizar la computadora?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                await onMachine(values);
            }
        });
    }

    if (loading === true) return <Loading />
    const url = `http://localhost:8080/api-siblab/image`;
    return (
        <>
            <Button className='btn-sm ' style={{ backgroundColor: " rgb(21 47 71)" }} onClick={handleShow}>
                <AiFillEdit />
            </Button>
            <Modal className='fade bg-secondary ' size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar computadora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}
                        encType="multipart/form-data">
                        <div className='row'>
                            <div className='col '>
                                <img src={imageUrl ? imageUrl : `${url}/${id}`} className='m-2 ms-5 ps-5' style={{ height: "102px", width: "auto" }} />
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        type="file"
                                        name='image'
                                        onChange={handleFileChange}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows={1} required
                                        name="specific_features" value={formik.values.specific_features}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <div className="error-message">{formik.touched.specific_features && formik.errors.specific_features}
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3"
                                >
                                    <Form.Label>Ubicacion</Form.Label>
                                    <Form.Select name="aula" value={formik.values.aula} onBlur={formik.handleBlur}
                                        onChange={formik.handleChange} >
                                        <option value="">Seleccione una opción</option>
                                        {options.map(option => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <div className="error-message">{formik.touched.aula && formik.errors.aula}
                                    </div>
                                </Form.Group>
                            </div>
                            <div className='col'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <div className="error-message">{formik.touched.name && formik.errors.name}
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="brand"
                                        value={formik.values.brand}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <div className="error-message">{formik.touched.brand && formik.errors.brand}
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>CPU</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cpu"
                                        value={formik.values.cpu}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <div className="error-message">{formik.touched.cpu && formik.errors.cpu}
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Disco duro</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="hard_disk"
                                        value={formik.values.hard_disk}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <div className="error-message">{formik.touched.hard_disk && formik.errors.hard_disk}
                                    </div>
                                </Form.Group>

                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" type='submit' onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button disabled={!formik.isValid || formik.isSubmitting} type="submit" className="btn " style={{ backgroundColor: " rgb(21 47 71)" }} >
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Editar computadora"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>

        </>

    )
}

export default ModalEditComputer