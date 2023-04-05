import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { GetTeacher, ChangeStatus } from '../services/TeacherService';
import ModalRegisterTeacher from './ModalRegisterTeacher';
import "../assets/css/paginate.css"
import apiUrl from '../../main/utils/AppUrl';
import { Button } from 'react-bootstrap';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import ModalEditTeacher from './ModalEditTeacher';
import Swal from 'sweetalert2';
import { onSuccess } from '../../main/utils/Alerts';
import Loading from '../../main/components/Loading';

const GetTeachersComponent = () => {
    const [options, setOptions] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 7; // cantidad de items que se mostrarán por página
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(options.length / itemsPerPage);
    const [docenteEdit, setDocenteEdit] = useState("")
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const getPeriods = async () => {
        try {
            const response = await apiUrl.get("http://localhost:8080/api-siblab/period/");
            const data = response.data.data;
            setPeriods(data);
        } catch (error) {
            console.log("error de perio", error)
        }
    }
    useEffect(() => {
        getPeriods()
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
    const periodos = [
        { id: 1, nombre: "enero - abril", inicio: "1/1", fin: "30/4" },
        { id: 2, nombre: "mayo - agosto", inicio: "1/5", fin: "31/8" },
        { id: 3, nombre: "septiembre - diciembre", inicio: "1/9", fin: "31/12" }
    ];
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);

    const tablaFiltrada = periods.filter((registro) => {
        const fechaInicio = new Date(registro.semester.semester_start).toLocaleDateString();
        const fechaFin = new Date(registro.semester.semester_finish).toLocaleDateString();
        if (!periodoSeleccionado) {
            return true;
        } else {
            const periodo = periodos.find(
                (p) => p.id === parseInt(periodoSeleccionado)
            );
            const inicioPeriodo = new Date(
                `${periodo.inicio}-${new Date().getFullYear()}`
            ).toLocaleDateString();
            const finPeriodo = new Date(
                `${periodo.fin}-${new Date().getFullYear()}`
            ).toDateString();
            return fechaInicio >= inicioPeriodo && fechaFin <= finPeriodo;
        }
    });

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
    const filas = tablaFiltrada.slice(pagesVisited, pagesVisited + itemsPerPage).map((option) => (
        <tr key={option.user.id}  >
            <td>{option.user.name}</td>
            <td>{option.user.surname}</td>
            <td>{option.user.email}</td>
            <td>{option.user.status === true ? 'Activo' : 'Inactivo'}</td>
            <td>
                <div>
                    <Button style={{ backgroundColor: " rgb(21 47 71)" }} size="sm" onClick={() => handleShow(option.user)}>
                        <AiFillEdit />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => showConfirmationSwal(option.user)}>
                        <AiOutlineDelete />
                    </Button>
                </div>

            </td>
        </tr>
    ))
    if (loading) return <Loading />

    return (

        <div className="container-sm pt-5 " style={{ width: "50%", marginLeft: "470px" }}>
            <div className=" d-md-flex  justify-content-md-end">
                <ModalRegisterTeacher onTeacher={choseTeacher} />
            </div>
            <select
                className="form-select"
                defaultValue={periodoSeleccionado}
                onChange={(e) => setPeriodoSeleccionado(e.target.value)}
            >
                <option value="">Seleccione un periodo</option>
                {periodos.map((periodo) => (
                    <option key={periodo.id} value={periodo.id}>
                        {periodo.nombre}
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
            <ModalEditTeacher
                show={show}
                handleClose={() => (setShow(false))}
                docente={docenteEdit}
                onTeacher={choseTeacher}
            />
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