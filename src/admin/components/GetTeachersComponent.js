import React, { useEffect, useState } from 'react'
import { GetTeacher } from '../services/TeacherService';
const GetTeachersComponent = () => {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);


    useEffect(() => {
        const choseTeacher = async () => {
            const response = await GetTeacher();
            const filteredTeacher = response.filter(objeto => objeto.role === 'Teacher');
            setOptions(filteredTeacher);
            console.log('filtro', filteredTeacher);
        }
        choseTeacher();

    }, []);
    const filas = options.map((option) => (
        <tr key={option.id}  >
            <td>{option.name}</td>
            <td>{option.surname}</td>
            <td>{option.email}</td>
            <td>{option.status === true ? 'Activo' : 'Inactivo'}</td>
        </tr>
    ))
    return (
        <div className="container-sm pt-5 " style={{ width: "50%", marginLeft: "470px" }}>

            <table className=" table border shadow table-hover table-striped text-center  ">
                <thead className="text-white fw-light" style={{ backgroundColor: "green" }}>
                    <tr >
                        <th>Nombre</th>
                        <th>Apellido paterno</th>
                        <th>email</th>
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
export default GetTeachersComponent