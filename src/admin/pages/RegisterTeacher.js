import React from 'react'
import { onFail, onSuccess } from '../../main/utils/Alerts';
import RegisterDocenteComponent from '../components/RegisterDocenteComponent'
import {RegisterT} from '../services/TeacherService';
const RegisterTeacher = () => {
  
  const onTeacher = async(data) =>{
    await RegisterT(data).then(response =>{
      response.data.message === "Usuario existente" ? onFail("El docente ya esta registrado") :onSuccess("Docente registrado")
    }).catch(error =>{
      console.log('error desde registerTeacher', error);
    })
  }
  return (
    <RegisterDocenteComponent onTeach={onTeacher}/>
    )
}

export default RegisterTeacher