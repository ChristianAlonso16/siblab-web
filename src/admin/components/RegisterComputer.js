import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Loading from '../../main/components/Loading';
import cargarArchivo from '../assets/images/cargarArchivo.png'
import { addMachine } from '../services/InventoryServices';
import { useNavigate } from 'react-router-dom';

function Example(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
      setShow(false) ;
      navigate("/admin/inventario");
  }
  const handleShow = () => setShow(true);
const [name, setName] = useState("");
const [brand, setBrand] = useState("");
const [hard_disk, setHardDisk] = useState("");
const [cpu, setCpu] = useState("");
const [specific_features, setFeatures] = useState("");
const [image, setImage] = useState("");
const [loading, setLoading] = useState(false);


    
   
  const onMachine = async(event) =>{
        event.preventDefault();
        setLoading(true);
        await addMachine({name,brand,hard_disk,cpu,specific_features,image}).then(res=>{
          setLoading(false);
          console.log('respuesta de registerCompu',res);
          props.onMachine(name);// enviar un item para renderizarlo en la tabla
        
        }).catch(error=>{
          console.log('error en register computer',error);
          setLoading(false);
        });
    }
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setImage(selectedFile);
      console.log(selectedFile);
    };
  
    if(loading===true) return <Loading />
  return (
    <>
      <Button className='btn-md mt-5 mb-5' variant="primary" onClick={handleShow}>
       Registrar computadora
      </Button>

      <Modal className='fade bg-secondary ' size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar computadora</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={event=>onMachine(event)}      
                   encType="multipart/form-data">
            <div className='row'>
            <div className='col '>
                <img  src={image} className='ms-5 ' style={{ height: "90px", width: "90px" }} />
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="file"
                autoFocus
                name='image'
                accept='image/*'
                onChange={handleFileChange}
                 />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control as="textarea" rows={1} required
               onChange={text =>setFeatures(text.target.value)}
              />
            </Form.Group>
            </div>
            <div className='col'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={text =>setName(text.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={text =>setBrand(text.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CPU</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={text =>setCpu(text.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Disco duro</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={text =>setHardDisk(text.target.value)}
              />
            </Form.Group>
        
            </div>
            </div>
            <Modal.Footer>
          <Button variant="secondary" type='submit' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type='submit' onClick={handleClose} >
          {loading?<FontAwesomeIcon icon={faSpinner} spin/> : "Registrar computadora"}
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
       
      </Modal>
    </>
  );
}

export default Example;