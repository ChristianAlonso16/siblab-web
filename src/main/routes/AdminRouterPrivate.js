import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminRouterPrivate = ({ children }) => {
  const { logged, user } = useContext(AuthContext)

  return (logged && (user.role === 'Admin')) ?
    children :
    (logged && (user.role === 'Teacher')) ?
      <Navigate to={'/docente/listaReportes'} /> :
      <Navigate to={'/login'} />
}

export default AdminRouterPrivate
