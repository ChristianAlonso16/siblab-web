import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../assets/css/viewReportComponent.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getReport, getLaboratoryById } from '../services/ListReportsService';

import imageAttach from '../../teacher/components/viewAttachment/file.png'
import imageSelect from '../../teacher/components/viewAttachment/computer.png'
import Swal from 'sweetalert2';
import { DisableMachine, ResolveProvelms } from '../services/ResolveProblems';


export const ViewReportComponent = ({ show, setShow, data, onReload }) => {

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

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
      <Modal className='fade bg-secondary' size='lg' show={show} onHide={handleClose}>
        {/* //<Modal.Dialog style={{ width: '100%', maxWidth: 'none' }}> */}
          <Modal.Header closeButton>
            <Modal.Title>Reporte general</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row ps-4 pe-4">
              <div className="col-4">
                <p className='fw-light'><strong>Docente:</strong> {data.name}</p>
                <p className='fw-light'><strong>Correo:</strong> {data.email}</p>
                <p className='fw-light'><strong>Registro:</strong> {new Date(data.create_at).toLocaleString()}</p>
                <p className='fw-light'><strong>Reportes:</strong> {data.report.length}</p>

                <div className='pt-3' style={{ overflow: 'auto', height: '100px', width: '100%' }}>
                  <p className='fw-light'><strong>Descripcion:</strong> {data.specific_report}</p>
                </div>
              </div>

              <div className="col-4">
                <div className='reportContainerA '>
                  {data.report.length < 1 ?
                    <>
                      <div style={{ textAlign: 'center' }}>
                        <img src={imageAttach} width='180px' />
                        <p className='fw-light'>Sin reportes adjuntos</p>
                      </div>
                    </> :
                    <>
                      {data.report.map((rep, index) => (
                        <div key={index} style={rep.defect && rep.status == 'Review_admin' ? {cursor:'pointer', backgroundColor:'orange', color:'white'} : rep.defect ?
                            {cursor:'pointer', backgroundColor:'red', color:'white'} : rep.status == 'Review_admin' ? {cursor:'pointer', backgroundColor:'green', color:'white'} : {cursor:'pointer'}}
                            id='button' className='reportA' onClick={() => {
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
                <div className='viewReportA'>
                  {loading ? <div style={{ marginTop: '50%', marginLeft: '50%', position: 'relative' }}> <FontAwesomeIcon icon={faSpinner} size='2x' color='#c3c3c3' spin /> </div> : apiError ? <></> : report ?
                    <div className='m-3' style={{ height: '100%', width: '100%', paddingBottom:'30px' }}>
                      <div style={{overflow:'auto', height: '100%', width: '100%'}}>
                        <p className='fw-light'><strong>Dispositivo:</strong> {report.machine.name}</p>
                        <p className='fw-light'><strong>Ubicacion:</strong> {report.laboratory.name} </p>
                        <p className='fw-light'><strong>Correo:</strong> {report.user && report.user.email}</p>
                        <p className='fw-light'><strong>Matrícula:</strong> {report.user && report.user.code}</p>
                        <p className='fw-light'><strong>Registro:</strong> {new Date(report.time_Register).toLocaleString()}</p>
                        <p className='fw-light'><strong>Salida:</strong> {hour(new Date(report.time_Finish))}</p>
                        <p className='fw-light'><strong>Reporte:</strong> {report.info}</p>
                      </div>
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
              { report && report.defect && report.status == 'Review_teacher' &&
                <Button style={{marginTop:'-110px',marginRight:"-100px"}}  variant="success" onClick={() => Resolve(report, onReload)}>
                  Resolver
                </Button>
              }
              <Button className='ms-4' variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal.Body>


      </Modal>
    </>
  );
}

const Resolve = (report, onReload) =>{
  Swal.fire({
    title: "¿Qué acción desea realizar?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Resolver",
    denyButtonText: "Deshabilitar Pc",
    cancelButtonText: "Cancelar",
    preConfirm: async() => {
      console.log(report)
      const response = await ResolveProvelms(report.id,report.attachment.id)
      if(response === 'ERROR')
      Swal.fire("¡Ocurrió un error!", "Error al resolver este reporte", "error");
      else
      Swal.fire("¡Resuelto!", "El reporte está resuelto", "success");
      onReload()
    },
    preDeny: async() => {
      const response = await DisableMachine(report.id, report.attachment.id, report.machine.id);
      if(response === 'ERROR')
      Swal.fire("¡Ocurrió un error!", "Error al deshabilitar esta computadora", "error");
      else
      Swal.fire("¡Deshabilitado!", "La computadora se ha sido deshabilitada.", "warning");
      onReload()
    },
  })
}