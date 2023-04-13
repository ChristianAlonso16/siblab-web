import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../main/components/Loading';
import { NoRecordsFound } from '../../teacher/components/noRecordsFound/NoRecordsFoundComponent';
import { getAulas } from '../services/AulasService';
import ModalRegisterLaboratory from './ModalRegisterLaboratory';

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

    const filas = aula.map((aulas,ind) => (
        <tr key={ind}  >
            <td>{ind+1}</td>
            <td>{aulas.name}</td>
            <td><button onClick={() => { iraula(aulas.id) }} type="button" className="btn btn-success btn-sm" > Visualizar computadoras</button></td>

        </tr>
    ))
    return (
        loading ? <Loading /> : apiError ? <></> :
        <div className="container p-3 fw-normal  pt-5 mt-5 mb-5    " style={{ width: "50%", marginLeft: "470px" }}>
            <ModalRegisterLaboratory idBuilding={id}/>

            { aula.length < 1 ?
            <NoRecordsFound text ={'Aún no tiene aulas asignadas este edificio'}/> :
            <>
            <div style={{ backgroundColor: "green", marginTop:'60px', width: "auto", height: "30px" }}></div>
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
            </>
            }
        </div>
    )
}

export default AulasComponent