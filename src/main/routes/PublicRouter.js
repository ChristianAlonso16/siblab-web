import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
const PublicRouter = ({children}) => {
    const { logged, user } = useContext(AuthContext)
    return ( !logged) ?
     children :
        (logged && (user.role === 'Teacher')) ?
         <Navigate to={'/docente/listaReportes'} />
         : <Navigate to={'/admin/listaReportes'} />
}

export default PublicRouter