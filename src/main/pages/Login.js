import React from 'react'
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../auth/AuthContext'
import { LoginComponent } from '../components/LoginComponent'
import { LoginService } from '../services/LoginService'

export const Login = () => {
  
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = async (data) =>{
    console.log('hola desde login',data)
    await LoginService(data).then(response =>{

      console.log('respuesta de siblab',response);
      login(response.data)
      if(response.data.role == "Admin") 
      navigate("/admin/listaReportes",{replace:true});
      if(response.data.role == "Teacher") 
      navigate('/docente/ListReports',{replace:true});

    }).catch(error=>{
      console.log('error desde login.js',error)
    })
  }

  return (
    <LoginComponent onData={onLogin}/>
  )
}

