import './CreateReport.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../main/auth/AuthContext";
import {FailureMachinesComponent} from "../failureMachines/FailureMachinesComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCircleCheck, faFileCircleXmark, faFileShield, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {AuthorizeFailReport} from "../../helpers/AuthorizeFailReport";
import {completeOtherReports} from "../../helpers/completeOtherReports";
import {createNewAttach} from "../../helpers/createNewAttach";
import {useFormik} from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';

export const CreateReportComponent = ({data, onShow, laboratories, buildings, reports = [], groups}) =>{

    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failures, setFailures] = useState({});
    const [reloadPc, setReloadPc] = useState(false);
    const [apiError, setApiError] = useState(false);
    const {user} = useContext(AuthContext);

    const id_laboratory = data ? data.laboratory.id : '';
    const id_building = data ? data.building.id : '';
    const name_classroom = data ? data.classroom.name : '';

    const actualDate = () =>{
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const hora = String(fechaActual.getHours()).padStart(2, '0');
        const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
        const segundos = String(fechaActual.getSeconds()).padStart(2, '0');
        return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    }

    useEffect(()=>{
        data && onChangeMachines(id_laboratory);
    },[])
    const formik = useFormik({
        initialValues: {
            laboratory: id_laboratory,
            name: user.name || '',
            create_at: actualDate(),
            building: id_building,
            classroom: name_classroom,
            specific_report: ''
        },
        validationSchema:Yup.object().shape({
            name: Yup.string().required('Este campo es obligatorio'),
            classroom: Yup.string().required('Este campo es obligatorio'),
            laboratory: Yup.string().required('Este campo es obligatorio'),
            building: Yup.string().required('Este campo es obligatorio'),
            specific_report: Yup.string().required('Este campo es obligatorio')
        }),
        onSubmit: async (values,{setSubmitting}) => {
            console.log(values);
            let destroys = [];
            for (const key in failures) {
                if (failures[key] === true) {
                    destroys.push(key);
                }
            }
            await showConfirmationSwal(destroys, values);
        },
    });

    const onReportMachines = async (destroys, values) =>{
        try {
     //       console.log({...values, status:'Review_teacher', email:user.username});
            const attach = await createNewAttach({...values, status:'Review_teacher', email:user.username});
            if (attach === 'ERROR') throw 'ERROR (create new attachment)'
            console.log(attach);
            let documentedReports = [];
            for (let fail of destroys) {
                for(let rep of reports){
                    if (rep.machine.id == fail) { // Reports for students
                        const resultFailReportStudent = await AuthorizeFailReport(rep.id,{status:'Review_teacher', defect:true, attachment:{id:attach.id}});
                        documentedReports.push(rep.machine.id+"");
                        if (resultFailReportStudent === 'ERROR') throw 'ERROR (change status of reports of students)'
                        console.log("AuthorizeFailReport 1")
                    }
                }
            }
            for (let fail of destroys) {
                if(!documentedReports.includes(fail)){ // New reports for teacher
                    const resultFailOther = await completeOtherReports(fail, {attachment: {id: attach.id}})
                    if (resultFailOther === 'ERROR') throw 'ERROR (create new reports fail for teacher)'
                }
            }
            for (let rep of reports) {
                if(!destroys.includes(rep.machine.id+"")){
                    const resultDefaultReport = await AuthorizeFailReport(rep.id, {status:'Review_teacher', defect:false, attachment:{id:attach.id}});
                    if(resultDefaultReport === 'ERROR') throw 'ERROR (change status of default reports)'
                    console.log("AuthorizeFailReport 2")
                }
            }
            onSuccess();
        }catch (err){
            console.log(err);
            onFail();
        }
    }

    const onChangeMachines = (id) =>{
        const machines = laboratories.find(lab => lab.id == id).machines;
        const building = laboratories.find(lab => lab.id == id).building;
        setReloadPc(true);
        setTimeout(() =>{
            formik.setFieldValue('building',building.id);
            setMachines(machines);
            setReloadPc(false);
        },1500);
    }

    const showConfirmationSwal = (destroys,values) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres generar el reporte general?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                await onReportMachines(destroys,values);
            }
        });
    }

    const onSuccess = () =>{
        Swal.fire(
            '¡Registrado!',
            'El reporte ha sido creado correctamente.',
            'success'
        ).then(() => window.location.reload())
    }
    const onFail = () =>{
        Swal.fire(
            'Error',
            'Ocurrió un error al realizar la transacción',
            'error'
        );
    }

    return(
        <>
            <div className='content'>
                {reports.length > 0 ?
                    <div style={{height:'40px', paddingTop:'5px',marginLeft:'30px', backgroundColor:'#339e52', borderRadius:'10px', marginRight:'30px'}} >
                        <div className='row' style={{height:'100%'}}>
                            <div className='col-1'>
                                <FontAwesomeIcon style={{marginLeft:'40px'}} size='2x' icon={faFileCircleCheck}/>
                            </div>
                            <div className='col-9'>
                                <p className='fw-light text-white' style={{marginLeft:'20px'}}> Reportes adjuntos:  {reports.length}</p>
                            </div>
                        </div>
                    </div>:
                    <div style={{height:'40px', paddingTop:'5px',marginLeft:'30px', backgroundColor:'orange', borderRadius:'10px', marginRight:'40px'}}>
                        <div className='row' style={{height:'100%'}}>
                            <div className='col-1'>
                                <FontAwesomeIcon style={{marginLeft:'40px'}} size='2x' icon={faFileCircleXmark}/>
                            </div>
                            <div className='col-9'>
                                <p className='fw-light' style={{marginLeft:'20px'}}> Sin reportes adjuntos</p>
                            </div>
                        </div>
                    </div>
                }
                <div className='container'>
                    <div className='card m-3 carta'>
                        <form onSubmit={formik.handleSubmit}>
                        <div className='row'>
                            <div className='col-5 column'>
                                <label htmlFor='name' style={{marginLeft:'10px'}}>Nombre:</label>
                                <div className='mt-2 mb-2'>
                                    <input id='name' name='name' value={formik.values.name} onChange={formik.handleChange} className='input'/>
                                    <div className="error-message">{formik.errors.name}</div>
                                </div>

                                <label htmlFor='group' style={{marginLeft:'10px'}}>Grupo:</label>
                                <div className='mt-2 mb-2'>
                                    <select id='group' name='classroom' value={formik.values.classroom} onChange={formik.handleChange} className='input'>
                                        <option value=''>Seleccione una opción</option>
                                        { groups.map(group => (
                                            <option key={group.id} value={group.name} > {group.name} </option>
                                        ))}
                                    </select>
                                    <div className="error-message">{formik.errors.group}</div>
                                </div>

                                <label htmlFor='time'  style={{marginLeft:'10px'}}>Creado:</label>
                                <div className='mt-2 mb-2'>
                                    <input id='time' name='create_at' value={formik.values.create_at} onChange={formik.handleChange} className='input' readOnly={true}/>
                                    <div className="error-message">{formik.errors.create_at}</div>
                                </div>

                                <label htmlFor='location' style={{marginLeft:'10px'}}>Docencia:</label>
                                <div className='mt-2 mb-2'>
                                    <select
                                        id="building"
                                        name="building"
                                        onChange={formik.handleChange}
                                        value={formik.values.building}
                                        className='input'
                                    >
                                        <option value=''>Seleccione una opción</option>
                                        { buildings.map(build => (
                                        <>
                                            <option key={build.id} value={build.id}>{build.name}</option>
                                        </>
                                    ))
                                    }
                                    </select>
                                    <div className="error-message">{formik.errors.building}</div>
                                </div>

                                <label htmlFor='laboratory' style={{marginLeft:'10px'}}>Aula:</label>
                                <div className='mt-2 mb-2'>
                                    <select
                                        id="laboratory"
                                        name="laboratory"
                                        onChange={async (lab)=> {
                                            await formik.setFieldValue('laboratory', lab.target.value);
                                            onChangeMachines (lab.target.value);
                                        }}
                                        value={formik.values.laboratory}
                                        className='input'
                                    >
                                        <option value=''>Seleccione una opción</option>
                                        { laboratories.map(lab => (
                                        <>
                                            <option key={lab.id} value={lab.id}>{lab.name}</option>
                                        </>
                                    ))
                                    }
                                    </select>
                                    <div className="error-message">{formik.errors.laboratory}</div>
                                </div>
                            </div>
                            <div className='col-5 mt-5'>
                                <label htmlFor='report' style={{marginLeft:'10px'}}>Reporte:</label>
                                <div className='mt-2 mb-2'>
                                    <textarea id='report' name='specific_report' value={formik.values.specific_report} onChange={formik.handleChange} className='input'/>
                                    <div className="error-message">{formik.errors.specific_report}</div>
                                </div>
                                { reloadPc ? <><div className='mt-5' style={{display:'flex', justifyContent:'center'}}><FontAwesomeIcon icon={faSpinner} spin size="3x" color="#C2C2C2" /></div> </> :
                                    <FailureMachinesComponent data={machines} onFailure={setFailures} failure={failures}/>
                                }
                                <Button className='botton ' type='submit'>Registrar</Button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}