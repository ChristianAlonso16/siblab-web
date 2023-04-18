import React, { useEffect, useState } from "react";
import "./Relations.css"; // Archivo de estilos para las tarjetas
import banner from '../pages/banner.jpg'
import { GetTeacher } from "../services/TeacherService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPlus, faSpinner, faTrash, faTrashAlt, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { GetC } from "../services/ClassroomService";
import axios from "axios";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RelationsComponent() {
    
    const [showModal, setShowModal] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [submit, setSubmit] = useState(false);
    

    const fillTeachers = async() =>{
        const response = await GetTeacher();
        let users = [];
        response.forEach(element => {
            element.role === 'Teacher' && users.push(element);
        });
        console.log(users);
        setTeachers(users);
        
    }

    const openModal = (teacher_id) =>{
        setShowModal(teacher_id);
    }

    const deletePeriod = async(id) =>{
        try {
            setSubmit(true);
            const url = `http://localhost:8080/api-siblab/period/${id}`;
            const response = await axios.delete(url,{
                withCredentials: true,
            });
            onSuccess();
        }catch (err){
            console.log(err);
            onError()
        }
    }

    const onSuccess = () =>{
        Swal.fire({
            title: '¡Éxito!',
            text: 'Grupo eliminado con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(()=> window.location.reload());
    }

    const onError = () =>{
        Swal.fire({
            title: '¡Error!',
            text: 'Ha ocurrido un error en la operación.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
    }

    const preDelete = async(id) =>{
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres descartar este grupo?, los datos se perderán',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                await deletePeriod(id);
            }
        });
    }

    useEffect(()=>{
        fillTeachers();
    },[]);
    
  return teachers.length > 0 &&(
    <div className="mt-5">
    { teachers.map((teacher,i) => (
      <div key={i} className="main-card1">
        {/* Tarjeta principal */}
        <div className="main-content1" style={{maxWidth:'300px', height:'310px'}}>
            <div className="card-image1">
              
            </div>
          
          <div className="card-content1" style={{margin:'16px'}}>
            <h3 className="card-title1">{teacher.name}</h3>
            <p className="card-description1">{teacher.surname}</p>
            <p className="card-description1 mt-5">{teacher.email}</p>
          </div>
        </div>
        <div className="ms-5" style={{overflow:'auto', display:'flex'}}>

        <div className="left-card1">

            <div className="add-card1" onClick={()=> openModal(teacher.id)}>
                <div className="add-card-content1">
                    <div className="add-card-icon-container1">
                        <FontAwesomeIcon icon={faPlus} className="add-card-icon1" />
                    </div>
                    <p className="add-card-description1">Agregar nuevo grupo</p>
                </div>
            </div>
            { teacher.periods[0] &&
            <div className="sub-card1 sub-card-1">
                <h5 className="sub-card-title1" style={{marginTop:'-10px'}}>{teacher.periods[0].classroom.grade}° {teacher.periods[0].classroom.name}</h5>
                <p className="sub-card-description1">{teacher.periods[0].classroom.career}</p>
                <div className="btn-circle btn-danger" title="Eliminar" onClick={() => preDelete(teacher.periods[0].id)}>
                        <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
            }
            </div>

            { teacher.periods.map( (group, ind, arr) =>  (
                <>
            { (ind > 0) && ((ind+1) % 2 === 0) &&
            <div className="left-card1">

                <div className="sub-card1 sub-card-1">
                    <h5 className="sub-card-title1" style={{marginTop:'-10px'}}>{arr[ind].classroom.grade}° {arr[ind].classroom.name}</h5>
                    <p className="sub-card-description1">{arr[ind].classroom.career}</p>
                    <div className="btn-circle btn-danger" title="Eliminar" onClick={() => preDelete(arr[ind].id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </div>
                { arr[ind +1] &&
                <div className="sub-card1 sub-card-1">
                    <h5 className="sub-card-title1" style={{marginTop:'-10px'}}>{arr[ind+1].classroom.grade}° {arr[ind+1].classroom.name}</h5>
                    <p className="sub-card-description1">{arr[ind + 1].classroom.career}</p>
                    <div className="btn-circle btn-danger" title="Eliminar" onClick={() => preDelete(arr[ind + 1].id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </div>
                }
            </div>
            }
            </>
            
            ))}
            
        </div>
        {
            showModal && <Modal onClose={setShowModal} teacher={showModal}/>
        }
      </div>
    ))}
    <ToastContainer/>
    </div>
  );
}

const Modal = ({onClose, teacher}) =>{

    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([]);
    const [semester, setSemester] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    }

    const handleConfirmClick = async() => {
        if(selectedOption){

            const data ={
                user_id:{id: teacher},
                classrooms_id:{id: selectedOption},
                semester:{id: semester.id},
            }
            console.log(data);
            try {
                setSubmit(true);
                const url = `http://localhost:8080/api-siblab/period/`;
                const response = await axios.post(url,data,{
                    withCredentials: true,
                });
                onSuccess();
            }catch (err){
                console.log(err);
                onError()
            }
            setSubmit(false);
            onClose(null);
        }else
            onIncomplete();
        
    }

    const onSuccess = () =>{
        Swal.fire({
            title: '¡Éxito!',
            text: 'Grupo asignado con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(()=> window.location.reload());
    }

    const onError = () =>{
        Swal.fire({
            title: '¡Error!',
            text: 'Ha ocurrido un error en la operación.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
    }

    const handleClose = () =>{
        onClose(null);
    }

    const fillOptions = async() =>{
        const response = await GetC();
        setOptions(response);
        const url = `http://localhost:8080/api-siblab/semester/`;
        const semester = await axios.get(url,{withCredentials:true})
        const currentSemester = semester.data.data.find(element => new Date() < new Date(element.semester_finish));
        setSemester(currentSemester);
    }

    useEffect(() =>{
        fillOptions();
    },[]);

    return(
        <div className="modal-overlay1">
      <div className="modal-container1">
        <h2 className="modal-title1">Selecciona un grupo</h2>
        <ul className="modal-options-list1">
          {options.map((option, index) => (
            <li
              key={index}
              className={`modal-option1 ${selectedOption === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.id)}
            >
              <strong className="me-3">{option.grade}°{option.name} </strong> {option.career}
            </li>
          ))}
          { options.length < 1 &&
            "No hay grupos disponibles para este docente"
          }
        </ul>
        <div className="modal-buttons-container1">
          <button style={{backgroundColor: "rgb(21 47 71)"}} className="modal-button1 modal-confirm1" disabled={submit} onClick={handleConfirmClick}>
            { submit ? <FontAwesomeIcon icon={faSpinner} spin/> : 'Confirmar'}
          </button>
          <button className="modal-button1 modal-cancel1" disabled={submit} onClick={handleClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
    )
}

const onIncomplete = () =>{
    toast.error('No se has seleccionado ninguna opción', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
}