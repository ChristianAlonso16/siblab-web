import React from 'react'
import { RegisterQ } from '../services/QuarterService';
import RegisterClassroomComponent from '../components/RegisterClassroomComponent';
const RegisterClassroom = () => {
    const onQuart = async (data) => {
        console.log('hola desde registerQuarter', data);
        await RegisterQ(data).then(response => {
            data.setLoading(false);
            console.log('respuesta de quarter', response);
        }).catch(error => {
            console.log('error desde registerQiarter', error);
            data.setLoading(false);
        })
    }

    return (
        <RegisterClassroomComponent onQuarter={onQuart} />
    )
}

export default RegisterClassroom