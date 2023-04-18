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
    const [semesters, setSemesters] = useState([]);
    const [currentSemester, setCurrentSemester] = useState(null);
    const [classrooms, setClassrooms] = useState([]);
    const itemsPerPage = 7; // cantidad de items que se mostrarán por página
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(options.length / itemsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const fillSemesters = async () => {
        try {
            const response = await apiUrl.get("http://3.88.177.163:8080/api-siblab/semester/");
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

    const fillGroups = async (current = null) => {
        try {
            const response = await apiUrl.get("http://3.88.177.163:8080/api-siblab/classroom/");
            const data = response.data.data;
            
            let filter = [];
            data.forEach(group =>{
                if(current != null && current !== "")
                    group.period.find(p => p.semester.id == current) && filter.push(group);
                else
                    filter.push(group);
            })
            setClassrooms(filter);
            
        } catch (error) {
            console.log("error de perio", error)
        }
    }

    useEffect(() => {
        fillSemesters();
    }, []);
    
    
    const filas = classrooms.map((option, ind) => (
        <tr key={ind}  >
            <td>{option.career}</td>
            <td>{option.grade}</td>
            <td>{option.name}</td>
            {/* <td>
            <div>
        <Button variant="primary" size="sm">
            <AiOutlineEdit />
        </Button>
        <Button variant="danger" size="sm">
            <AiOutlineDelete/>
        </Button>
            </div>
            </td> */}

        </tr>
    ));
            
    return (
        <div className="container-sm pt-5 " style={{ width: "60%", marginLeft: "400px" }}>
            <div className=" d-md-flex  justify-content-md-end">
                <ModalRegisterGroup />
            </div>
            <select
                className="form-select"
                onChange={(e) => fillGroups(e.target.value)}>

                <option value={""}>Todos los grupos</option>
                {semesters.map((semester) => (
                    <option selected={semester.id === currentSemester.id} key={semester.id} value={semester.id}>
                        {semester.name}
                    </option>
                ))}
            </select>
            <table className=" table border shadow-lg table-hover table-striped text-center  ">
                <thead className="text-white fw-light" style={{ backgroundColor: "green" }}>
                    <tr >
                        <th>Carrera</th>
                        <th>Grado</th>
                        <th>Nombre</th>
                        {/* <th>Acciones</th> */}
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