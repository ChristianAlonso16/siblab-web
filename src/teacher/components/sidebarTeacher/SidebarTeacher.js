import React, {useContext} from "react";
import {FaClipboardList,FaUserAlt, FaHistory, FaPlus, FaPeopleCarry} from 'react-icons/fa';
import{SlLogout} from 'react-icons/sl';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SidebarTeacher.css'
import {AuthContext} from "../../../main/auth/AuthContext";
import image from './img.png'

export const SidebarTeacher = () =>{

    const {user, logout} = useContext(AuthContext);

    const onLogout = () =>{
        logout();
    }
    return (
        <div className="container-fluid  h-100 rounded">
            <div className="d-flex flex-column col-md-3 flex-shrink-0 p-3 text-white sidebar bgTeacher">
                <a  className="d-flex aling-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <img src={image} className='imagen'/>
                    <div className = "vertical" style={{marginLeft:'15px'}}></div>
                    <span className="fs-4 mb-5 ms-5 fw-normal">Profesor</span>
                </a>
                <h4>{user.name}</h4>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">

                        <a href="/docente/listReports" className="nav-link text-white menu " aria-current="page">
                            <FaClipboardList className='sidenav-icon'/>
                            Lista de Reportes
                        </a>
                    </li>
                    <hr/>

                    <li>
                        <a href="/docente/myGroups" className="nav-link text-white menu">
                            <FaPeopleCarry className='sidenav-icon'/>
                            Mis grupos
                        </a>
                    </li>
                    <hr/>

                    <li>
                        <a href="/docente/createReport" className="nav-link text-white menu">
                            <FaPlus className='sidenav-icon'/>
                            Crear nuevo reporte
                        </a>
                    </li>
                    <hr/>

                    <li>
                        <a href="/docente/history" className="nav-link text-white menu">
                            <FaHistory className='sidenav-icon'/>
                            Historial
                        </a>
                    </li>

                </ul>
                <hr/>
                <a href="" onClick={onLogout} className="nav-link text-white ">
                    <SlLogout className='sidenav-icon'/>
                    Cerrar Sesión
                </a>
            </div>
        </div>
    )
}