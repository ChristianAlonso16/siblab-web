import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BsEye } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';


export const ViewReport = ({show, setShow, data}) =>{

    const hour = (date) =>{
        const hora = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        const segundos = String(date.getSeconds()).padStart(2, '0');
        return `${hora}:${minutos}:${segundos}`;
    }

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal  className='fade bg-secondary '   show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reporte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col" style={{maxHeight:'350px', maxWidth:'200px'}}>
                            <img width='100%'  src={`http://localhost:8080/api-siblab/image/${data.machine.id}`}/>
                        </div>
                        <div className="col">
                            <p className='fw-light'><strong>Dispositivo:</strong> {data.machine.name}</p>
                            <p className='fw-light'><strong>Ubicacion:</strong> {data.laboratory.name}</p>
                            <p className='fw-light'><strong>Alumno:</strong> {data.user.name} {data.user.surname}</p>
                            <p className='fw-light'><strong>Correo:</strong> {data.user.email}</p>
                            <p className='fw-light'><strong>Matrícula:</strong> {data.user.code}</p>
                            <p className='fw-light'><strong>Registro:</strong> {new Date(data.time_Register).toLocaleString()}</p>
                            <p className='fw-light'><strong>Hora de salida:</strong> {hour(new Date(data.time_Finish))}</p>
                        </div>
                        <div style={{overflow:'auto', height:'50px'}}>
                            <p className='fw-light'><strong>Descripcion:</strong> {data.info}</p>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}