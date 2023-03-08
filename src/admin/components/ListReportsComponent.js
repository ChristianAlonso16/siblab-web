import React from 'react'

const ListReportsComponent = () => {
  return (
    <div className="container-sm p-5 posicion " >
    <table className=" table table-hover table-secondary  ">
        <thead>
            <tr>
                <th scope="col">Lista de reportes</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td scope="row" className="p-3 fw-light"><i className="bi bi-laptop"></i> <i
                    className="bi bi-mouse2-fill pe-3"></i>10:00</td>
                <td> Angel camargo silva</td>
                <td>    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">  <i className="bi bi-eye"></i> </button></td>

            </tr>
        </tbody>
    </table>
</div>
  )
}

export default ListReportsComponent