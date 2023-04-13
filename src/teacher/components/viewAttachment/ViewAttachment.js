import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ViewAttachment.css'
import { AuthContext } from "../../../main/auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getReport } from "../../helpers/getReport";
import { getLaboratoryById } from "../../helpers/getLaboratoryById";
import imageAttach from './file.png'
import imageSelect from './computer.png'


export const ViewAttachment = ({ show, setShow, data }) => {

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const { user } = useContext(AuthContext);

    const hour = (date) => {
        const hora = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        const segundos = String(date.getSeconds()).padStart(2, '0');
        return `${hora}:${minutos}:${segundos}`;
    }

    const handleClose = () => {
        setShow(false)
    }

    const showReport = async (id) => {
        setLoading(true);
        const response = await getReport(id);
        if (response === 'ERROR') {
            setApiError(true);
            setLoading(false);
        } else {
            setApiError(false);
            const laboratory = await getLaboratoryById(response.machine.laboratory.id)
            setTimeout(() => {
                setReport({ ...response, laboratory });
                setLoading(false);
                console.log(response);
            }, 1000)
        }
    }

    return (
        <>
            <Modal className='fade' size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reporte general</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row ps-4 pe-4">
                        <div className="col-4">
                            <p className='fw-light'><strong>Docente:</strong> {data.name}</p>
                            <p className='fw-light'><strong>Correo:</strong> {user.username}</p>
                            <p className='fw-light'><strong>Registro:</strong> {new Date(data.create_at).toLocaleString()}</p>
                            <p className='fw-light'><strong>Reportes:</strong> {data.report.length}</p>

                            <div className='pt-3' style={{ overflow: 'auto', height: '100px', width: '100%' }}>
                                <p className='fw-light'><strong>Descripcion:</strong> {data.specific_report}</p>
                            </div>
                        </div>

                        <div className="col-4">
                            <div className='reportContainer'>
                                {data.report.length < 1 ?
                                    <>
                                        <div style={{ textAlign: 'center' }}>
                                            <img src={imageAttach} width='180px' />
                                            <p className='fw-light'>Sin reportes adjuntos</p>
                                        </div>
                                    </> :
                                    <>
                                        {data.report.map((rep, index) => (
                                            <div key={index} style={rep.defect ? {cursor:'pointer', backgroundColor:'red', color:'white'} : {cursor:'pointer'}} id='button' className='report' onClick={() => {
                                                showReport(rep.id);
                                                document.getElementById('button').classList.toggle('report-active');
                                            }}>
                                                <div className='row'>
                                                    <div className='col-2'>
                                                        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                                                    </div>
                                                    <div className='col-10'>
                                                        <p className={!rep.defect && 'fw-light'}> {rep.user.id && data.users.find(us => us.id == rep.user.id).name} {rep.user.id ? data.users.find(us => us.id == rep.user.id).surname : 'No reportado'} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        }</>
                                }
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='viewReport'>
                                {loading ? <div style={{ marginTop: '50%', marginLeft: '50%', position: 'relative' }}> <FontAwesomeIcon icon={faSpinner} size='2x' color='#c3c3c3' spin /> </div> : apiError ? <></> : report ?
                                    <div className='m-3' style={{ height: '100%', width: '100%' }}>
                                        <p className='fw-light'><strong>Dispositivo:</strong> {report.machine.name}</p>
                                        <p className='fw-light'><strong>Ubicacion:</strong> {report.laboratory.name} </p>
                                        <p className='fw-light'><strong>Correo:</strong> {report.user && report.user.email}</p>
                                        <p className='fw-light'><strong>Matrícula:</strong> {report.user && report.user.code}</p>
                                        <p className='fw-light'><strong>Registro:</strong> {new Date(report.time_Register).toLocaleString()}</p>
                                        <p className='fw-light'><strong>Salida:</strong> {hour(new Date(report.time_Finish))}</p>
                                        <p className='fw-light'><strong>Reporte:</strong> {report.info}</p>
                                    </div>
                                    :
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={imageSelect} width='180px' />
                                        <p className='fw-light'>Selecciona un reporte</p>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}