import {ViewReport} from "../viewReport/ViewReport";
import '../listReports/ListReports.css'
import image from '../listReports/img.png'
import React, {useContext, useEffect, useState} from "react";
import Loading from "../../../main/components/Loading";
import {getAllReports} from "../../helpers/getAllReports";
import Button from 'react-bootstrap/Button';
import { BsEye } from 'react-icons/bs';
import {getLaboratoryById} from "../../helpers/getLaboratoryById";
import {AuthContext} from "../../../main/auth/AuthContext";
import {NoRecordsFound} from "../noRecordsFound/NoRecordsFoundComponent";

export const HistoryGroups = () =>{

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [reports, setReports] = useState([]);
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const {user} = useContext(AuthContext);

    const fillReports = async () =>{
        setLoading(true);
        const response = await getAllReports();
        if (response === 'ERROR'){
            setApiError(true);
        }else {
            setApiError(false);
            const add = [];
            response.forEach(report =>{
                if ((report.status === 'Review_teacher') || (report.status === 'Attend_admin'))
                    if (report.attachment.email === user.username)
                        add.push(report);
            });
            setReports(add);
        }
        setLoading(false)
    }

    const handleShow = async (report) =>{
        const laboratory = await getLaboratoryById(report.machine.laboratory.id);
        await setData({...report, laboratory});
        console.log(data)
        setShowModal(true);
    }

    useEffect(() =>{
        fillReports();
    },[])

    return( loading ? <Loading/> : apiError ? <></> : reports.length < 1 ?
                <div style={{marginLeft:'300px'}}><NoRecordsFound text ={'No tienes ningún reporte de algún alumno'}/> </div>:
        <div className="p-5 contentList " >
                <table className=" table table-hover table-secondary table-border  ">
                    <thead>
                    <tr>
                        <th scope="col" style={{width: '200px'}}>Lista de reportes</th>
                        <th scope="col" style={{width: '230px'}}></th>
                        <th scope="col" style={{width: '255px'}}></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    { reports.map(report => (
                        <tr key={report.id}>
                            <td className='ps-5 fw-light'><img height='45px' src={image}/> {new Date(report.time_Register).getHours() + ':'+ new Date(report.time_Register).getMinutes()}</td>
                            <td className='fw-bold' style={{verticalAlign:'middle'}}>{report.user.name + ' ' + report.user.surname}</td>
                            <td style={{verticalAlign:'middle'}}> {report.machine.name + ' ' + report.machine.brand}</td>
                            <td style={{verticalAlign:'middle'}}>
                                <Button className='btn-sm btn' variant="secondary" onClick={()=>handleShow(report)}>
                                    <BsEye/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            { !showModal ? <></> :
            <ViewReport show={showModal} setShow={setShowModal} data={data}/>
        }
        </div>
    )
}