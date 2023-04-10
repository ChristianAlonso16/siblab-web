import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { GetTeacher, ChangeStatus } from '../services/TeacherService';
import ModalRegisterTeacher from './ModalRegisterTeacher';
import "../assets/css/paginate.css"
import apiUrl from '../../main/utils/AppUrl';
import { Button } from 'react-bootstrap';
import { AiFillEdit, AiFillPlusCircle, AiOutlineDelete, AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';
import ModalEditTeacher from './ModalEditTeacher';
import Swal from 'sweetalert2';
import { onSuccess } from '../../main/utils/Alerts';
import Loading from '../../main/components/Loading';

const GetTeachersComponent = () => {
    const [options, setOptions] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [currentSemester, setCurrentSemester] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 7; // cantidad de items que se mostrarán por página
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(options.length / itemsPerPage);
    const [docenteEdit, setDocenteEdit] = useState("")
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const fillSemesters = async () => {
        try {
            const response = await apiUrl.get("http://localhost:8080/api-siblab/semester/");
            const data = response.data.data;
            setSemesters(data);
            let current = {};
            if(data.length > 0)
                current = data.find(sem => new Date() < new Date(sem.semester_finish) && new Date() > new Date(sem.semester_start));
            setCurrentSemester(current);
            current && fillTeachers(current.id)
            fillTeachers();

        } catch (error) {
            console.log("error de perio", error)
        }
    }

    const fillTeachers = async (current = null) => {
        try {
            const response = await apiUrl.get("http://localhost:8080/api-siblab/user/");
            const data = response.data.data;
            let filter = [];
            data.forEach(user =>{
                if(current != null && current !== ""){
                    if(user.role === 'Teacher')
                        user.periods.find(p => p.semester.id == current) && filter.push(user);
                }else
                    user.role === 'Teacher' && filter.push(user);
            })
            setTeachers(filter);
        } catch (error) {
            console.log("error de perio", error)
        }
    }

    useEffect(() => {
        fillSemesters();
        choseTeacher();
    }, []);
    const handleShow = (docente) => {
        setShow(true)
        setDocenteEdit(docente);

    };
    const choseTeacher = async (newItem) => {
        const response = await GetTeacher();
        const filteredTeacher = response.filter(objeto => objeto.role === 'Teacher');
        setOptions(filteredTeacher, newItem);
    }
    

    const changeStatus = async (user) => {
        setLoading(true);
        try {
            console.log("staus", user.id)
            const response = await ChangeStatus(user.id);
            user.status === true ? onSuccess("Desactivado") : onSuccess("Activado");
            setTimeout(() => {
                setLoading(false);
                window.location.reload();
            }, 2000);
        } catch (error) {
            setLoading(false);
        }

    }
    const showConfirmationSwal = (user) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres cambiar el estado del docente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            preConfirm: async () => {
                await changeStatus(user);
            }
        });
    }
    const filas = teachers.map((option, ind) => (
        <tr key={ind}  >
            <td>{option.name}</td>
            <td>{option.surname}</td>
            <td>{option.email}</td>
            <td>{option.status === true ? 'Activo' : 'Inactivo'}</td>
            <td>
                <div>
                    <ModalEditTeacher docente={option}/>
                    <Button variant={option.status ? 'danger' : 'success'} className='ms-2' size="sm" onClick={() => showConfirmationSwal(option)}>
                        {option.status ? <AiOutlineDelete /> : <AiOutlinePlusCircle/> }
                    </Button>
                </div>

            </td>
        </tr>
    ))
    if (loading) return <Loading />

    return (

        <div className="container-sm pt-5 " style={{ width: "60%", marginLeft: "400px" }}>
            <div className=" d-md-flex  justify-content-md-end">
                <ModalRegisterTeacher onTeacher={choseTeacher} />
            </div>
            <select
                className="form-select"
                onChange={(e) => fillTeachers(e.target.value)}>

                <option value={""}>Todos los docentes</option>
                {semesters.map((semester) => (
                    <option selected={semester.id === currentSemester.id} key={semester.id} value={semester.id}>
                        {semester.name}
                    </option>
                ))}
            </select>
            <table className=" table border shadow-lg table-hover table-striped text-center  ">
                <thead className="text-white fw-light" style={{ backgroundColor: "green" }}>
                    <tr >
                        <th>Nombre</th>
                        <th>Apellido paterno</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody  >
                    {filas}
                </tbody>
            </table>
           
            {options.length > 7 ?
                <ReactPaginate

                    breakLabel="..."
                    pageCount={pageCount}
                    onPageChange={changePage}
                    className={"pagination"}
                    activeClassName={'active'}
                    nextLabel="Siguiente >"
                    previousLabel="< Atras"
                    renderOnZeroPageCount={null}
                /> : ""
            }

        </div>

    )
}
export default GetTeachersComponent