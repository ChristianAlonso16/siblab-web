import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Navigate } from 'react-router-dom'

const TeacherRouterPrivate = ({children}) => {
  const {logged,user} = useContext(AuthContext)
    return ( logged && (user.role == 'Teacher'))?  
    children :
  (logged && (user.role =='Admin'))?
   <Navigate to={'/admin/listaReportes'}/> : 
   <Navigate to={'/login'}/>
}

export default TeacherRouterPrivate