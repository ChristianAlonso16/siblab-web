import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../main/components/Loading';
import { getAulas } from '../services/AulasService';

const AulasComponent = () => {
    const { id } = useParams();
    const [aula, setAula] = useState([]);
    const navigate = useNavigate();

  
    useEffect(() => {
        const findAula = async () => {
            const response = await getAulas();
            const aulaFiltro = response.data.data;
            const filteredObjetos = aulaFiltro.filter(objeto => objeto.building.id === parseInt(id));
            setAula(filteredObjetos);
        }
        findAula();

    }, []);
    const iraula = (id) => {
        navigate(`/admin/aulas/aula/${id}`)
    }
    if (!aula.length) return <Loading />;

    const filas = aula.map((aulas) => (
        <tr key={aulas.id}  >
            <td>{aulas.id}</td>
            <td>{aulas.name}</td>
            <td><button onClick={()=>{iraula(aulas.id)}} type="button" className="btn btn-success btn-sm" > Visualizar computadoras</button></td>

        </tr>
    ))
    return (

        <div className="container-sm p-5 fw-normal  mt-5 mb-5    " style={{ width: "50%", marginLeft: "490px" }}>
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