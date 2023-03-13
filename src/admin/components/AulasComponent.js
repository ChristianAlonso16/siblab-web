import React from 'react'
import { useNavigate } from 'react-router-dom'
const AulasComponent = () => {
    const navigate = useNavigate();
    const iraula=() =>{
        navigate("/admin/aulas/aula")
    }
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
            <tr>
                <td scope="row" className="p-3 fw-light"><i className="bi bi-display"></i> <i
                        className="bi bi-mouse2-fill pe-3"></i></td>
                <td>Centro de computo 7</td>
                <td>    <button onClick={iraula} type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Visualizar computadoras</button></td>
            </tr>
            <tr>
                <td scope="row" className="p-3 fw-light"><i className="bi bi-display"></i> <i
                        className="bi bi-mouse2-fill pe-3"></i></td>
                <td>Centro de computo 7</td>
                <td>    <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Visualizar computadoras</button></td>
            </tr>
            <tr>
                <td scope="row" className="p-3 fw-light"><i className="bi bi-display"></i> <i
                        className="bi bi-mouse2-fill pe-3"></i></td>
                <td>Centro de computo 7</td>
                <td>    <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Visualizar computadoras</button></td>
            </tr>
            <tr>
                <td scope="row" className="p-3 fw-light"><i className="bi bi-display"></i> <i
                        className="bi bi-mouse2-fill pe-3"></i></td>
                <td>Centro de computo 7</td>
                <td>    <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Visualizar computadoras</button></td>
            </tr>
            <tr>
                <td scope="row" className="p-3 fw-light"><i className="bi bi-display"></i> <i
                        className="bi bi-mouse2-fill pe-3"></i></td>
                <td>Centro de computo 7</td>
                <td>    <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Visualizar computadoras</button></td>
            </tr>
        </tbody>
    </table>
</div>
  )
}

export default AulasComponent