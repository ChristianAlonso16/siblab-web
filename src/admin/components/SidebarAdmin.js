import React, { useContext } from 'react'
import {FaClipboardList,FaUserAlt} from 'react-icons/fa';
import {BsBuildings,} from 'react-icons/bs';
import{MdOutlineInventory} from 'react-icons/md';
import{SlLogout} from 'react-icons/sl';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/sidebarAdmin.css';
import iconoAdmin from '../assets/images/iconoAdmin.png'
import { AuthContext } from '../../main/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
const SidebarAdmin = () => {
const navigate=useNavigate();
const onLogout=()=>{
    logout();
    navigate("/login",{
        replace:true
    })
}
const {user,logout} = useContext(AuthContext);

  return (
    <div className="container-fluid  h-100 rounded">
    <div className="d-flex flex-column col-md-3 flex-shrink-0 p-3 text-white sidebar bgAdmin">
        <a href="login" className="d-flex aling-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <img className="imagen" src={iconoAdmin} alt="Admin"/>
            <div className = "vertical"></div>
            <span className="fs-4 mb-5 ms-5 fw-normal">Administrador</span>
        </a>
        <h4>{user.name}</h4>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">

                <a href="/admin/listaReportes" className="nav-link text-white menu " aria-current="page">
                <FaClipboardList className='sidenav-icon'/>

                    Lista de Reportes
                </a>
            </li>
            <hr/>

            <li>
                <a href="/admin/laboratorios" className="nav-link text-white menu">
                   <BsBuildings className='sidenav-icon'/>
                    Espacios
                </a>
            </li>
            <hr/>

            <li>
                <a href="/admin/registrarDocente" className="nav-link text-white menu">
                   <FaUserAlt className='sidenav-icon'/>
                    Docentes
                </a>
            </li>
            <hr/>

            <li>
                <a href="/admin/inventario" className="nav-link text-white menu">
                   <MdOutlineInventory className='sidenav-icon'/>
                    Inventario
                </a>
            </li>
            <hr/>

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

export default SidebarAdmin