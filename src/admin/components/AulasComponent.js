import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../main/components/Loading';
import { getAulas } from '../services/AulasService';

const AulasComponent = () => {
    const [aula,setAula] = useState([]);
    useEffect(()=>{
        findAula();
    },[]);
    const findAula = async ()=>{
        const response = await getAulas();
        setAula(response.data.data)
    }

    const navigate = useNavigate();
    const iraula=() =>{
        navigate("/admin/aulas/aula")
    }
    if(!aula.length) return <Loading/>;
    const filas = aula.map((aulas)=>(
        <tr key={aulas.id}  >
            <td>{aulas.id}</td>
            <td>{aulas.name}</td>
            <td><button onClick={iraula} type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Visualizar computadoras</button></td>

        </tr>
    ))
  return (

    <div className="container-sm p-5 fw-normal  mt-5 mb-5    " style={{width: "50%", marginLeft: "490px"}}>
    <div style={{backgroundColor: "green", width: "auto", height: "30px"}}></div>

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