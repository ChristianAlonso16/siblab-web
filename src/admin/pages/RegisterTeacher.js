import React from 'react'
import RegisterDocenteComponent from '../components/RegisterDocenteComponent'
import {RegisterT} from '../services/TeacherService';
const RegisterTeacher = () => {
  
  const onTeacher = async(data) =>{
    console.log('hola desde registerTeacher',data);
    await RegisterT(data).then(response =>{
      data.setLoading(false);
      console.log('respuesta de teacher',response);

    }).catch(error =>{
      console.log('error desde registerTeacher', error);
      data.setLoading(false);
    })
  }
  return (
    <RegisterDocenteComponent onTeach={onTeacher}/>
    )
}

export default RegisterTeacher