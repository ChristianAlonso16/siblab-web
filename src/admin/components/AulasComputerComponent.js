import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {MdOutlineComputer} from 'react-icons/md'
import {BsFillMouse2Fill} from 'react-icons/bs'
const AulasComputerComponent = () => {
  return (
   
    <div className="container-sm pt-5 mt-5" style={{width: "50%", marginLeft: "470px"}}>
    <table className=" table border shadow table-hover table-striped text-center">
        <thead className="text-white fw-light" style={{backgroundColor: "green"}}>
            <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Sistema</th>
                <th scope="col">CPU</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Estado</th>
                <th scope="col">Codigo QR</th>
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
                <td><button className='btn btn-success btn-sm'>Generar codigo</button></td>
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
                <td><button className='btn btn-success btn-sm'>Generar codigo</button></td>

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
                <td><button className='btn btn-success btn-sm'>Generar codigo</button></td>

            </tr>
        </tbody>
    </table>
</div>

  )
}

export default AulasComputerComponent