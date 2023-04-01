import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { GetQuater } from '../services/QuarterService';
import ModalRegisterQuater from './ModalRegisterQuater';
import "../assets/css/paginate.css"

const GetQuatersComponent = () => {
    const [options, setOptions] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const itemsPerPage = 7; // cantidad de items que se mostrarán por página
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(options.length / itemsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {

        sortData();

    }, []);
    const sortData = async (newItem) => {
        const response = await getQuater();
        setOptions(response, newItem);

    }
    const getQuater = async () => {
        const response = await GetQuater();
        const sortedData = response.sort((a, b) => {
            const aNum = Number(a.name);
            const bNum = Number(b.name);
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

    const filas = options.slice(pagesVisited, pagesVisited + itemsPerPage).map((option) => (
        <tr key={option.id}  >
            <td>{option.name}</td>
            <td>{new Date(option.semester_start).toLocaleDateString()}</td>
            <td>{new Date(option.semester_finish).toLocaleDateString()}</td>
        </tr>
    ))
    return (
        <div className="container-sm pt-5 " style={{ width: "50%", marginLeft: "470px" }}>
            <div className=" d-md-flex  justify-content-md-end">
                <ModalRegisterQuater onQuater={sortData} />
            </div>
            <table className=" table border shadow-lg table-hover table-striped text-center  ">
                <thead className="text-white fw-light" style={{ backgroundColor: "green" }}>
                    <tr >
                        <th>Nombre</th>
                        <th>Fecha inicio</th>
                        <th>Fecha fin</th>

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
export default GetQuatersComponent