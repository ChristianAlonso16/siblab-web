import React from 'react'
import RegisterClassroomComponent from '../components/RegisterClassroomComponent';
import { RegisterC } from '../services/ClassroomService';

const RegisterClassroom = () => {
    const onClass = async (data) => {
        console.log('hola desde registerClassrrom', data);
        await RegisterC(data).then(response => {
            console.log('respuesta de quarter', response);
        }).catch(error => {
            console.log('error desde registerClassrrom', error);
        })
    }

    return (
        <RegisterClassroomComponent onClassrom={onClass} />
    )
}

export default RegisterClassroom