import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import Example from '../components/RegisterComputer'
import Loading from '../../main/components/Loading';
import { getInventory } from '../services/InventoryServices';

const url = 'http://localhost:8080/api-siblab/image';
const InventoryComponent = () => {
    const [machine, setMachine] = useState([]);
    useEffect(() => {
        findMachine();
    }, [])


    const findMachine = async (newItem) => {
        const response = await getInventory();
        setMachine(response.data.data,newItem); //recibe nuevo registro para renderizarlo
    }


  //  if (!machine.length) return <Loading />

    const filas = machine.map((mach) => (
        <tr key={mach.id}  >
            <td><img src={`${url}/${mach.id}`}  style={{ height: "90px", width: "90px" }} alt="Computadora" /></td>
            <td>{mach.name}</td>
            <td>{mach.hard_disk}</td>
            <td>{mach.brand}</td>
            <td>{mach.cpu}</td>
            <td>{mach.status === true ? 'Activa' : 'Inactiva'}</td>
        </tr>
    ))
    return (
        <div className="container-sm " style={{ width: "50%", marginLeft: "470px" }}>
            <div className=" d-md-flex  justify-content-md-end">
                <Example onMachine={findMachine} />
            </div>
            <table className=" table border shadow table-hover table-striped text-center  ">
                <thead className="text-white fw-light" style={{ backgroundColor: "green" }}>
                    <tr >
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>CPU</th>
                        <th>Marca</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody  >
                    {filas}
                </tbody>
            </table>
        </div>

    )
}

export default InventoryComponent