import Loading from "../../main/components/Loading";
import Button from "react-bootstrap/Button";
import {BsEye} from "react-icons/bs";
import React, {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {getAllStudents,getAllAttachments} from "../services/ListReportsService";
import {NoRecordsFound} from "../../teacher/components/noRecordsFound/NoRecordsFoundComponent";
import { ViewReportComponent } from "./ViewReportComponent";
import "../assets/css/listReports.css"

export const ListReportsComponent = ({attachments = [], onAttach, isFilter = false, onReload}) =>{

    const opciones = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [filasDesplegadas, setFilasDesplegadas] = useState([]);

    const addLines = (ind,arr) =>{
        let line = [];
        let next = true;
        arr.forEach((attach, index) => {
            if (index >= ind) {
                if (arr[index + 1] && (new Date(arr[index].create_at).getDate() !== new Date( arr[index + 1].create_at).getDate())) {
                    next && setTimeout( ()=> line.forEach(i => handleClick(i)),10);
                    next && line.push(index);
                    next = false;
                }
                next && line.push(index);
                next && console.log(index);
            }
        })
        if (next) setTimeout( ()=> line.forEach(i => handleClick(i)),10);
    }

    const handleClick = (filaIndex) =>{
        setFilasDesplegadas(prev => (
            prev.includes(filaIndex)
                ? prev.filter(index => index !== filaIndex)
                : [...prev, filaIndex]
        ))
        console.log(filasDesplegadas);
    }


    const handleShow = async (attachment) =>{
        const users = await getAllStudents();
        await setData({...attachment, users});
        console.log(data)
        setShowModal(true);
    }

    return( loading ? <Loading/> : apiError ? <></> : attachments.length < 1 ?
            <div style={{marginLeft:'300px'}}><NoRecordsFound text ={'Aún no tienes historial'}/> </div>:
            <div  className="container-sm py-3 mt-3" style={{ width: "60%", marginLeft: "400px" }}>
                { isFilter &&
                <div style={{padding:'5px', backgroundColor:'#0099FF', borderRadius:'5px', cursor:'pointer'}}
                    onClick={()=> onAttach([])}>
                    <a href="#" style={{color:'white', textDecoration:'none'}}>
                        <FontAwesomeIcon icon={faChevronLeft} size="20px" color="white" style={{ marginRight:'10px', marginLeft:'10px'}}/>
                        Volver
                    </a>
                </div>
                }
                <table className=" table table-hover table-secondary table-borderA  ">
                    <thead>
                    <tr>
                        <th scope="col" style={{width: '200px'}}>Lista de reportes</th>
                        <th scope="col" style={{width: '230px'}}></th>
                        <th scope="col" style={{width: '255px'}}></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr className='shadowCol'>
                        <td>

                            <button
                                className={`btn-desplegar ${filasDesplegadas.includes(0) ? 'abierto' : ''}`}
                                onClick={() => addLines(0, attachments)}
                            >
                                <FontAwesomeIcon icon={faAngleDown}/>
                            </button>

                        </td>
                        <td>{attachments.length > 0 && (new Date(attachments[0].create_at).toLocaleString('es-ES', opciones))}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    {attachments.map((attach, index, arr) => (
                        <React.Fragment key={index}>
                            {!filasDesplegadas.includes(index) &&
                                <tr key={attach.id}>
                                    <td className='ps-5 fw-light'>
                                        <img height='45px'
                                             src={""}/> {new Date(attach.create_at).getHours() + ':' + new Date(attach.create_at).getMinutes()}
                                    </td>
                                    <td className='fw-bold' style={{verticalAlign: 'middle'}}>{attach.name}</td>
                                    <td style={{verticalAlign: 'middle'}}>Grupo: {attach.classroom}</td>
                                    <td style={{verticalAlign: 'middle'}}>
                                        <Button className='btn-sm btn' variant="secondary"
                                                onClick={() => handleShow(attach)}>
                                            <BsEye/>
                                        </Button>
                                    </td>
                                </tr>
                            }
                            {arr[index + 1] && (new Date(arr[index].create_at).getDate() !== new Date(arr[index + 1].create_at).getDate()) &&
                                <tr className='shadowCol'>
                                    <td>

                                        <button
                                            className={`btn-desplegar ${filasDesplegadas.includes(index + 1) ? 'abierto' : ''}`}
                                            onClick={() => addLines(index + 1, arr)}
                                        >
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </button>

                                    </td>
                                    <td>{(new Date(arr[index + 1].create_at).toLocaleString('es-ES', opciones))}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            }
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                {!showModal ? <></> :
                <ViewReportComponent onReload={onReload} show={showModal} setShow={setShowModal} data={data}/>
                }
            </div>
    )

}