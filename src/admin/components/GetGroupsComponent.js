import React, { useEffect, useState } from 'react'
import { GetC } from '../services/ClassroomService';
import ModalRegisterGroup from './ModalRegisterGroup';
import ReactPaginate from 'react-paginate';
import "../assets/css/paginate.css"
import apiUrl from '../../main/utils/AppUrl';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
const GetGroupsComponent = () => {
    const [options, setOptions] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [periods, setPeriods] = useState([]);

    const itemsPerPage = 7; // cantidad de items que se mostrarán por página
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(options.length / itemsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const getPeriods = async () => {
        try {
            const response = await apiUrl.get("http://localhost:8080/api-siblab/period/");
            const data = response.data.data;
            console.log("peri", data)
            setPeriods(data);
        } catch (error) {
            console.log("error de perio", error)
        }
    }

    useEffect(() => {
        getPeriods()
        sortData();

    }, []);
    const sortData = async (newItem) => {
        const response = await getGroups();
        setOptions(response, newItem);

    }
    const getGroups = async () => {
        const response = await GetC();
        const sortedData = response.sort((a, b) => {
            const aNum = Number(a.grade);
            const bNum = Number(b.grade);
            if (aNum < bNum) {
                return -1;
            }
            if (aNum > bNum) {
                return 1;
            }
            return 0;
        });

        return sortedData;
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
    const filas = tablaFiltrada.slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((option) => {

            const classroomsRows = option.classrooms.map((classroom) => (
                <tr key={classroom.id}  >
                    <td>{classroom.career}</td>
                    <td>{classroom.grade}</td>
                    <td>{classroom.name}</td>
                    <td>
                    <div>
                <Button variant="primary" size="sm">
                   <AiOutlineEdit />
                </Button>
                <Button variant="danger" size="sm">
                    <AiOutlineDelete/>
                </Button>
                   </div>
                    </td>

                </tr>
            ));
            return classroomsRows;
        })
        .flat();

    return (
        <div className="container-sm pt-5 " style={{ width: "50%", marginLeft: "470px" }}>
            <div className=" d-md-flex  justify-content-md-end">
                <ModalRegisterGroup onGroup={sortData} />
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
                        <th>Carrera</th>
                        <th>Grado</th>
                        <th>Nombre</th>
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
export default GetGroupsComponent