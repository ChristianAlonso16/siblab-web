import './ReportsComponent.css'
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAllLaboratories} from "../../helpers/getAllLaboratories";
import {getAllBuildings} from "../../helpers/getAllBuildings";
import {CreateReportComponent} from "../createReport/CreateReportComponent";
import {getAllGroups} from "../../helpers/getAllGroups";
import {getGroupById} from "../../helpers/getGroupById";
import Loading from "../../../main/components/Loading";
import {ViewReport} from "../viewReport/ViewReport";
import {getLaboratoryById} from "../../helpers/getLaboratoryById";
import {getAllReports} from "../../helpers/getAllReports";
import {NoRecordsFound} from "../noRecordsFound/NoRecordsFoundComponent";

export const ReportsComponent = () =>{

    const [reports , setReports] = useState([]);
    const [laboratories, setLaboratories] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [laboratory, setLaboratory] = useState({});
    const [building, setBuilding] = useState({});
    const [classroom, setClassroom] = useState({});
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [showAttach, setShowAttach] = useState(false);
    const [data, setData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const {group} = useParams();

    const fillReports = async () =>{
        setLoading(true);
        const [rLab, rBuil, rRep, rGroup, rGroups] = await Promise.all([
            getAllLaboratories(),
            getAllBuildings(),
            getAllReports(),
            getGroupById(group),
            getAllGroups()
        ])

        if ((rLab === 'ERROR') || (rRep === 'ERROR') || (rBuil === 'ERROR') || (rGroups === 'ERROR')){
            setApiError(true);
            
        }else{
            let reportFilter = [];
            rRep.forEach(report =>{
                if(report.status === 'Pending_student')
                if (report.user.classroom.id == group)
                    reportFilter.push(report)
            });
            setReports(reportFilter);
            setBuildings(rBuil);
            setLaboratories(rLab);
            setClassroom(rGroup);
            setGroups(rGroups);

            const lab = reportFilter.length > 0 ? rLab.find(la => la.id === reportFilter[0].machine.laboratory.id): null;
            const buil = lab ? rBuil.find(bu => bu.id === lab.building.id) : null;
            setBuilding(buil);
            setLaboratory(lab);
        }
        setLoading(false);
    }

    const onLoadAttach = () =>{
        setLoading(true);
        setTimeout(() =>{
            setShowAttach(true);
            setLoading(false);
        },2000);
    }

    const handleShow = async (report) =>{
        const laboratory = await getLaboratoryById(report.machine.laboratory.id);
        await setData({...report, laboratory});
        console.log(data)
        setShowModal(true);
    }

    useEffect(()=>{
        fillReports();
    },[]);

    return(
    <>{ loading ? <div> <Loading /> </div> : apiError ? <></> : showAttach ? <CreateReportComponent onShow = {setShowAttach} reports = {reports} groups = {groups} data = {{ building, laboratory, classroom}} laboratories = {laboratories} buildings={buildings}/> : reports.length < 1 ?
            <div style={{marginLeft:'300px'}}><NoRecordsFound text ={'Parece que este grupo no tiene reportes pendientes'}/> </div>:

            <div className='content'>
                <div className='container contenedor mt-2'>
                    <div className='row'>
                        {reports.map(report => (
                            <div key={report.id} className='col-6 p-4'>
                                <div style={report.defect ? {borderWidth:'10px', borderStyle:'solid', borderImage: 'linear-gradient( #EF5350, transparent) 1'} : {}} className='card cart p-3' onClick={()=>handleShow(report)}>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-4 text'>
                                                <svg width="117" height="108" viewBox="0 0 127 118" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M71.1953 82.5C73.4474 82.5 74.9488 80.625 74.9488 78.375C74.9488 76.125 73.4474 74.625 71.1953 74.625C68.9431 74.625 67.0663 76.5 67.0663 78.375C67.4417 81 68.9431 82.5 71.1953 82.5ZM14.8915 0H126.373C126.373 28.875 126.373 57.75 126.373 86.625C100.098 86.625 73.8228 86.625 47.5477 86.625V70.875H118.49V7.875H14.8915V0ZM31.7827 43.5H8.13509V35.625H31.7827V43.5ZM12.264 94.5C10.0119 94.5 8.13509 93 8.13509 90.375C8.13509 88.125 10.0119 86.625 12.264 86.625C14.5162 86.625 16.393 88.5 16.393 90.375C16.393 93 14.5162 94.5 12.264 94.5ZM12.264 83.625C11.138 83.625 9.63653 82.5 9.63653 81C9.63653 79.875 10.7626 78.75 12.264 78.75C13.7655 78.75 14.5162 79.875 14.5162 81C14.5162 82.5 13.3901 83.625 12.264 83.625ZM31.7827 31.5H8.13509V23.625H31.7827V31.5ZM0.62793 15.75H40.0405V117.75H0.62793V15.75ZM51.6766 102.375H59.5592V94.5H83.2067V102.375H91.0892V110.25H83.2067H59.5592H51.6766V102.375Z"
                                                          fill={"black"}/>
                                                </svg>
                                            </div>
                                            <div className='col-8 text'>
                                                <div className='verticalLine'>
                                                    <p><strong> Maquina: </strong> {report.machine.name}</p>
                                                    <p>
                                                        <strong> Espacio: </strong> {laboratories.find(lab => lab.id == report.machine.laboratory.id).name}
                                                    </p>
                                                    <p>{report.user.name} {report.defect && <p style={{color:'red'}}>Se encontraron daños</p>}</p>
                                                    <p>{new Date(report.time_Register).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    { !showModal ?  <Button style={{backgroundColor: "#339e52"}} className='boton' onClick={onLoadAttach}>Generar reporte</Button> :
                        <ViewReport data={data} setShow={setShowModal} show={showModal}/>
                    }
                </div>
            </div>
        }
        </>
    )
}