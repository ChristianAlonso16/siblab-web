import Loading from "../../../main/components/Loading";
import image from "../listReports/img.png";
import Button from "react-bootstrap/Button";
import {BsEye} from "react-icons/bs";
import React, {useContext, useEffect, useState} from "react";
import './History.css'
import {getAllAttachments} from "../../helpers/getAllAttachments";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {ViewAttachment} from "../viewAttachment/ViewAttachment";
import {getAllStudents} from "../../helpers/getAllStudents";
import {AuthContext} from "../../../main/auth/AuthContext";
import {NoRecordsFound} from "../noRecordsFound/NoRecordsFoundComponent";


export const HistoryComponent = () =>{

    const opciones = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [filasDesplegadas, setFilasDesplegadas] = useState([]);
    const {user} = useContext(AuthContext);

    const addLines = (ind,arr) =>{
        let line = [];
        let next = true;
        arr.forEach((attach, index) => {
            if (index >= ind) {
                if (arr[index + 1] && (new Date(arr[index].create_at).getDay() !== new Date( arr[index + 1].create_at).getDay())) {
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

    const fillAttachments = async () =>{
        setLoading(true);
        const response = await getAllAttachments();
        console.log(response)
        if (response === 'ERROR'){
            setApiError(true);
        }else {
            setApiError(false);
            let filter = [];
            const historyTeacher = response.filter(obj => obj.report.length === 0)
            console.log('filtro',historyTeacher)
            historyTeacher.sort((a,b)=> new Date(b.create_at).getTime() - new Date(a.create_at).getTime())
            for (let res of historyTeacher ){
                if (res.email === user.username)
                    filter.push(res);
            }
            setAttachments(filter);
        }
        setLoading(false);
    }

    useEffect(() =>{
        fillAttachments()
    },[]);

    const handleShow = async (attachment) =>{
        const users = await getAllStudents();
        await setData({...attachment, users});
        console.log("historyComponet",data)
        setShowModal(true);
    }

    return( loading ? <Loading/> : apiError ? <></> : attachments.length < 1 ?
            <div style={{marginLeft:'300px'}}><NoRecordsFound text ={'Aún no tienes historial'}/> </div>:
            <div className="ps-5 pe-3 pt-3 contentList">
                <table className=" table table-hover table-secondary table-border  ">
                    <thead>
                    <tr>
                        <th scope="col" style={{width: '200px'}}>Historial</th>
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
                                             src={image}/> {new Date(attach.create_at).getHours() + ':' + new Date(attach.create_at).getMinutes()}
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
                            {arr[index + 1] && (new Date(arr[index].create_at).getDay() !== new Date(arr[index + 1].create_at).getDay()) &&
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
                <ViewAttachment show={showModal} setShow={setShowModal} data={data}/>
                }
            </div>
    )

}