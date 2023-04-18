import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../main/auth/AuthContext";
import './Students.css'
import { getAllGroups } from "../../helpers/getAllGroups";
import axios from "axios";
import Loading from "../../../main/components/Loading";
import { NoRecordsFound } from "../noRecordsFound/NoRecordsFoundComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSpinner, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { BsEye } from "react-icons/bs";
import Modal from "react-modal";
import image from './file.png';
import { getReportsByStudent } from "../../helpers/getReportsByStudent";

const StudentsComponent = () =>{

    const {user} = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [currentSemester, setCurrentSemester] = useState(null);
    const [rows, setRows] = useState([]);

    const fillSemesters = async () => {
        try {
            const response = await axios.get("http://3.88.177.163:8080/api-siblab/semester/",{withCredentials:true});
            const data = response.data.data;
            setSemesters(data);

            let current = {};
            if(data.length > 0)
                current = data.find(sem => new Date() < new Date(sem.semester_finish) && new Date() > new Date(sem.semester_start));
            setCurrentSemester(current);
            current && fillGroups(current.id)
            fillGroups();
        } catch (error) {
            console.log(error)
        }
    }

    const fillGroups = async(current = null) =>{
        try {
            setLoading(true);
            const data = await getAllGroups();
            if(data === 'ERROR'){
                setApiError(true);
            }else{
                let preFilter = [];
                data.forEach(element =>{
                    element.period.find(p => p.user.id == user.id) && preFilter.push(element);
                })
                let filter = [];
                preFilter.forEach(group =>{
                    
                    if(current != null && current !== "")
                        group.period.find(p => p.semester.id == current) && filter.push(group);
                    else
                        filter.push(group);
                })
                setGroups(filter);
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    const handleClick = (filaIndex) =>{
        setRows(prev => (
            prev.includes(filaIndex)
                ? prev.filter(index => index !== filaIndex)
                : [...prev, filaIndex]
        ))
    }

    useEffect(()=>{
        fillSemesters();
    },[]);
    
    return(
    <div className="ps-5 pe-3 pt-3 contentList">
        <select
                className="form-control"
                onChange={(e) => fillGroups(e.target.value)}>
                {semesters.map((semester) => (
                    <option selected={semester.id === currentSemester.id} key={semester.id} value={semester.id}>
                        {semester.name}
                    </option>
                ))}
        </select>
        { groups.length < 1 ?
            <NoRecordsFound text ={'Aún no tienes grupos'}/>:

        <table className=" table table-hover table-secondary table-border  ">
            <thead>
            <tr>
                <th scope="col" style={{width: '200px'}}>Historial</th>
                <th scope="col" style={{width: '330px'}}></th>
                <th scope="col" style={{width: '180px'}}></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>

            
            {groups.map((group, index, arr) => (
                <React.Fragment key={index}>
                    <tr className='shadowCol'>
                        <td>
                            <button
                                className={`btn-desplegar ${rows.includes(group.id) ? 'abierto' : ''}`}
                                onClick={()=>handleClick(group.id)}>
                                <FontAwesomeIcon icon={faAngleDown}/>
                            </button>
                        </td>
                        <td><strong className="me-3">{group.grade}°{group.name}</strong> {group.career}</td>
                        <td></td>
                        <td></td>
                    </tr>

                    { !rows.includes(group.id) && group.users.map((student,ind)=>(
                        <tr key={ind}>
                            <td className='fw-bold' style={{verticalAlign: 'middle'}}><FontAwesomeIcon className="ms-3" icon={faUserCircle} size="2x"/></td>
                            <td style={{verticalAlign: 'middle'}}>{student.name} {student.surname}</td>
                            <td style={{verticalAlign: 'middle'}}>{student.code}</td>
                            <td style={{verticalAlign: 'middle'}}>
                                
                                <Reports isOpen={true} student={student}/>
                            </td>
                        </tr>
                    ))}
                    
                    
                </React.Fragment>
            ))}
            </tbody>
        </table>
        }
    </div>
    );
}

const Reports = ({student}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [reports, setReports] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleOptionClick = (option) => {
    console.log(option);
    setSelectedOption(option);
  };

  const fillReports = async() =>{
    setLoading(true);
    const response = await getReportsByStudent(student.id);
    if(response === 'ERROR'){
        setApiError(true);
    }else{
        setApiError(false);
        const filter = response.filter(report => report.id_teacher == user.id)
        setReports(filter);
    }
    console.log(response)
    setLoading(false);
  }

  useEffect(()=>{
    fillReports();
  },[])

  const hour = (date) => {
    const hora = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
    return `${hora}:${minutos}:${segundos}`;
    }

  return(
    <div>
      <Button className='btn-sm btn' variant="secondary" onClick={handleOpenModal}>
        <BsEye/>
    </Button>
      <div className={`${modalIsOpen ? "background-modal1" : ""}`}>
      <div
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className={`modal1 ${modalIsOpen ? "show" : "hide"}`}
        overlayClassName="modal-overlay1"
      >
        <div className="modal-content1">
            { loading ? 
                <><FontAwesomeIcon style={{position:'absolute', top:'50%', right:'50%'}} size="3x" icon={faSpinner} spin/></> :
            <div className="row" style={{height:'350px'}}>
                <h4>Reportes: {reports.length}</h4>
                <div className="left-card col-5">
                    
                    <ul className="options-list">
                        { reports.map((report,ind) => (
                            <li key={ind} onClick={() => handleOptionClick(report)}>
                                {report.info}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="right-card col-5">
                    {selectedOption ? 
                    <div className='m-3' style={{ height: '100%', width: '100%', overflow:'auto' }}>
                        <p className='fw-light'><strong>Dispositivo:</strong> {selectedOption.machine.name}</p>
                        <p className='fw-light'><strong>Ubicacion:</strong> {selectedOption.machine.laboratory.name} </p>
                        <p className='fw-light'><strong>Correo:</strong> {selectedOption.user.email}</p>
                        <p className='fw-light'><strong>Matrícula:</strong> {selectedOption.user.code}</p>
                        <p className='fw-light'><strong>Registro:</strong> {new Date(selectedOption.time_Register).toLocaleString()}</p>
                        <p className='fw-light'><strong>Salida:</strong> {hour(new Date(selectedOption.time_Finish))}</p>
                        <p className='fw-light'><strong>Reporte:</strong> {selectedOption.info}</p>
                    </div> :
                    
                    <div style={{textAlign:'center'}}>
                        <img src={image} width={'90%'} alt=""/>
                        <p>Seleccione un reporte</p>
                    </div>
                    }
                </div>
                <Button onClick={handleCloseModal} style={{ backgroundColor: '#d0d0d0', color: 'black', position: 'absolute', right: '290px', bottom: '90px', width: '200px' }}>Cerrar</Button>
                </div>
            }
            </div>
        </div>
    </div>
    </div>
  );
  };
  

export default StudentsComponent;