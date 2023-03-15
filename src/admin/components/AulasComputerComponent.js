import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import Loading from '../../main/components/Loading';
import { getComputerAulas } from '../services/AulasService';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import InfoModal from './GenerateQr';
const url = 'http://localhost:8080/api-siblab/image';

const AulasComputerComponent = ({ data }) => {
    const [computers, setComputers] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        findMachine();
    }, [])

    const findMachine = async () => {
        const response = await getComputerAulas();
        setComputers(response.data.data); //recibe nuevo registro para renderizarlo
    }

    const handleShow = (computer) => {
        setShow(true)
        setSelectedItem(computer);
        console.log('entro amodal', computer.id)

    };

    const handleClose = () => {
        setShow(false);
        setSelectedItem(null);
    }
  

    if (!computers.length) return <Loading />

    const filas = computers.map((computer) => (
        <tr key={computer.id}  >
            <td><img src={`${url}/${computer.id}`} style={{ height: "90px", width: "90px" }} alt="Computadora" /></td>
            <td>{computer.name}</td>
            <td>{computer.hard_disk}</td>
            <td>{computer.brand}</td>
            <td>{computer.cpu}</td>
            <td>{computer.status === true ? 'Activa' : 'Inactiva'}</td>
            <td>
                <Button className='btn-sm' variant="primary" onClick={() => handleShow(computer)}>
                    Generar codigo Qr
                </Button>
               
            </td>

        </tr>
    ))
    
    return (
        
        <div className="container-sm pt-5 mt-5" style={{ width: "50%", marginLeft: "470px" }}>
            <table className=" table border shadow table-hover table-striped text-center">
                <thead className="text-white fw-light" style={{ backgroundColor: "green" }}>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>CPU</th>
                        <th>Marca</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                        <th scope="col">Codigo QR</th>
                    </tr>
                </thead>
                <tbody>
                    {filas}
                    
                </tbody>
                
            </table>
            <InfoModal 
           show={show}
            handleClose={handleClose}
            qrValue={selectedItem}
           />
        </div>

    )
}

export default AulasComputerComponent