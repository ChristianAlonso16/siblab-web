import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../main/components/Loading';
import { NoRecordsFound } from '../../teacher/components/noRecordsFound/NoRecordsFoundComponent';
import { getAulas } from '../services/AulasService';

const AulasComponent = () => {
    const { id } = useParams();
    const [aula, setAula] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const findAula = async () => {
            setLoading(true);
            try {
                const response = await getAulas();
                const aulaFiltro = response.data.data;
                const filteredObjetos = aulaFiltro.filter(objeto => objeto.building.id === parseInt(id));
                setAula(filteredObjetos);
            } catch (error) {
                setLoading(false);
                setApiError(true);
            }
            setLoading(false);
        }
        findAula();

    }, []);
    const iraula = (id) => {
        navigate(`/admin/aulas/aula/${id}`)
    }

    const filas = aula.map((aulas) => (
        <tr key={aulas.id}  >
            <td>{aulas.id}</td>
            <td>{aulas.name}</td>
            <td><button onClick={() => { iraula(aulas.id) }} type="button" className="btn btn-success btn-sm" > Visualizar computadoras</button></td>

        </tr>
    ))
    return (
        loading ? <Loading /> : apiError ? <></> : aula.length < 1 ?
        <div style={{marginLeft:'300px'}}><NoRecordsFound text ={'Aún no tiene aulas asignadas este edificio'}/> </div>:
        <div className="container p-3 fw-normal  mt-2 mb-5    " style={{ width: "50%", marginLeft: "470px" }}>
            <div style={{ backgroundColor: "green", width: "auto", height: "30px" }}></div>
            <table className="table table-hover table-secondary border text-center shadow ">
                <thead >
                    <tr>
                        <th scope="col">Aulas</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {filas}
                </tbody>
            </table>
        </div>
    )
}

export default AulasComponent