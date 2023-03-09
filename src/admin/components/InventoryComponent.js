import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import {MdOutlineComputer} from 'react-icons/md'
import {BsFillMouse2Fill} from 'react-icons/bs'
const InventoryComponent = () => {
  return (
    <div className="container-sm " style={{width: "50%", marginLeft: "470px"}}>
        <div className="d-md-flex  justify-content-md-end">
            <button className="btn btn-primary btn-md mt-5 mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button">Registrar computadora</button>
          </div>
        <table className=" table border shadow table-hover table-striped text-center ">
            <thead className="text-white fw-light" style={{backgroundColor: "green"}}>
                <tr>
                    <th scope="col">Imagen</th>
                    <th scope="col">Sistema</th>
                    <th scope="col">CPU</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row" className="p-3 fw-light">
                        <MdOutlineComputer/>
                        <BsFillMouse2Fill/>
                    </td>
                    <td> Windows</td>
                    <td> Intel celeron</td>
                    <td>Lenovo</td>
                    <td>Legon</td>
                    <td>Disponible</td>

                </tr>
              
             
                <tr>
                    <td scope="row" className="p-3 fw-light">
                    <MdOutlineComputer/>
                        <BsFillMouse2Fill/>
                    </td>
                    <td> Windows</td>
                    <td> Intel celeron</td>
                    <td>Lenovo</td>
                    <td>Legon</td>
                    <td>Disponible</td>

                </tr>
              
                <tr>
                    <td scope="row" className="p-3 fw-light">
                    <MdOutlineComputer/>
                        <BsFillMouse2Fill/>
                    </td>
                    <td> Windows</td>
                    <td> Intel celeron</td>
                    <td>Lenovo</td>
                    <td>Legon</td>
                    <td>Disponible</td>

                </tr>
            </tbody>
        </table>
    </div>
    
  )
}

export default InventoryComponent