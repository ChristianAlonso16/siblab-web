import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '../../main/components/Loading';
import { getComputerAulas } from '../services/AulasService';
import { Button } from 'react-bootstrap';

import InfoModal from './GenerateQr';
import { useParams } from 'react-router-dom';
import { NoRecordsFound } from '../../teacher/components/noRecordsFound/NoRecordsFoundComponent';
const url = 'http://localhost:8080/api-siblab/image';

const AulasComputerComponent = ({ data }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [computers, setComputers] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [show, setShow] = useState(false);


    useEffect(() => {
        setLoading(true);
        const findMachine = async () => {
            const response = await getComputerAulas();
            const aulaFiltro = response.data.data;
            const filteredComputer = aulaFiltro.filter(objeto => objeto.laboratory.id === parseInt(id))
            setComputers(filteredComputer);
        }
        setLoading(false);
        findMachine();
    }, [])


    const handleShow = (computer) => {
        setShow(true)
        setSelectedItem(computer);
   //     console.log('entro amodal', computer.id)

    };
    


    const filas = computers.map((computer) => (
        <tr key={computer.id}  >
            <td><img src={`${url}/${computer.id}`}style={{ height: "80px", width: "auto" }}  alt="Computadora" /></td>
            <td style={{verticalAlign:'middle'}}>{computer.name}</td>
            <td style={{verticalAlign:'middle'}}>{computer.hard_disk}</td>
            <td style={{verticalAlign:'middle'}}>{computer.brand}</td>
            <td style={{verticalAlign:'middle'}}>{computer.cpu}</td>
            <td style={{verticalAlign:'middle'}}>{computer.status === true ? 'Activa' : 'Inactiva'}</td>
            <td style={{verticalAlign:'middle'}}>
                <Button className='btn-sm btn' style={{backgroundColor:" rgb(21 47 71)"}} onClick={() => handleShow(computer)}>
                    Generar codigo QR
                </Button>
               
            </td>

        </tr>
    ))
    
    return (
        loading ? <Loading /> : computers.length < 1 ? <div style={{marginLeft:'300px'}}>
        <NoRecordsFound text ={'Aún no tiene computadoras asignadas este laboratorio'}/> </div>:
        <div className="container-sm pt-5 mt-5" style={{ width: "60%", marginLeft: "400px" }}>
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
            handleClose={()=>(setShow(false))}
            qrValue={selectedItem}
           />
        </div>

    )
}

export default AulasComputerComponent