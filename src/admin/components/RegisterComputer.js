import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import cargarArchivo from '../assets/images/cargarArchivo.png'
function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Form>
            <div className='row'>
            <div className='col '>
                <img  src={cargarArchivo} className='ms-5 '  style={{width:"193px"}} />
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="file"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control as="textarea" rows={1} required />
            </Form.Group>
            </div>
            <div className='col'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CPU</Form.Label>
              <Form.Control
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Disco duro</Form.Label>
              <Form.Control
                type="text"
                autoFocus
              />
            </Form.Group>
        
            </div>
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type='submit' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;