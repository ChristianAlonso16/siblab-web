import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BsEye } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
function ViewReport() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='btn-sm btn' variant="secondary" onClick={handleShow}>
       <BsEye/>

      </Button>

      <Modal className='fade bg-secondary '  show={show} onHide={handleClose}>
        <Modal.Header closeButton>  
          <Modal.Title>Reporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="row">
                        <div className="col">
                            <img src=""/>
                        </div>
                        <div className="col">
                            <p>Nombre del dispositivo: PC-03</p>
                            <p>Ubicacion del dispositivo:Docencia 5</p>
                            <p>Alumno: Edwin Yaret Barragan</p>
                            <p>Docente: Jose Narvaez</p>
                            <p>Fecha de registro: 03/03/2023</p>
                        </div>
                        <p>Descripcion:</p>

                    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type='submit' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Resolver
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewReport;