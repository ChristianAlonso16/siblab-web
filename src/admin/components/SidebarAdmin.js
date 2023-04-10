import React, { useContext, useEffect, useState } from 'react'
import {FaClipboardList,FaUserAlt} from 'react-icons/fa';
import {BsBuildings,} from 'react-icons/bs';
import{MdLineWeight, MdOutlineInventory} from 'react-icons/md';
import{SlLogout} from 'react-icons/sl';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/sidebarAdmin.css';
import iconoAdmin from '../assets/images/iconoAdmin.png'
import { AuthContext } from '../../main/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './StyleSideBar.css'
import { faChevronDown, faChevronLeft, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const SidebarAdmin = () => {
const navigate=useNavigate();
const onLogout=()=>{
    logout();
    navigate("/",{
        replace:true
    })
}
const {user,logout} = useContext(AuthContext);
const [show, setShow] = useState(false);

    const handleShow = () =>{
        setShow(prev => !prev);
    }

    useEffect(() =>{
        checkSession();
    },[]);

    const checkSession = async() =>{
        try{
        
            const url = `http://localhost:8080/api-siblab/session/`;
            const response = await axios.get(url,{withCredentials:true});
            
        }catch(err){
            console.log(err);
            err.response.data === 'La sesión no está activa' && logout();
        }
    }

  return (
    <div className="container-fluid  h-100 rounded">
    <div className="d-flex flex-column col-md-3 flex-shrink-0 p-3 text-white sidebar bgAdmin">
        <a  className="d-flex aling-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <img className="imagen" src={iconoAdmin} alt="Admin"/>
            <div className = "vertical"></div>
            <span className="fs-4 mb-5 ms-3 fw-normal">Administrador</span>
        </a>
        <h4>{user.name}</h4>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">

                <a href="/admin/listaReportes" className="nav-link text-white menuA " aria-current="page">
                <FaClipboardList className='sidenav-icon'/>

                    Lista de Reportes
                </a>
            </li>
            <hr/>

            <li>
                <a href="/admin/docentes" className="nav-link text-white menuA">
                   <FaUserAlt className='sidenav-icon'/>
                     Docentes
                </a>
            </li>
            <hr/>

            <li>
                <a href="/admin/inventario" className="nav-link text-white menuA">
                   <MdOutlineInventory className='sidenav-icon'/>
                    Inventario
                </a>
            </li>
            <hr/>
            <li className='sidebar-menu-item'>
                <a href="#" className="nav-link text-white menuA sidebar-menu-item__button" onClick={handleShow}>
                <FontAwesomeIcon icon={show ? faChevronUp : faChevronLeft} className={`sidebar-menu-item__icon${show ? ' sidebar-menu-item__icon--open' : ''}`} />
                   Asignaciones
                </a>
                <ul className={`sidebar-menu-item__list ${show ? 'sidebar-menu-item__list--open' : ''}`}>

                    <li className='sidebar-menu-item__element'>
                        <a href="/admin/cuatrimestres" className="nav-link text-white menuA">
                            <MdOutlineInventory className='sidenav-icon'/>
                            Cuatrimestres
                        </a>
                    </li>

                    <li className='sidebar-menu-item__element'>
                        <a href="/admin/laboratorios" className="nav-link text-white menuA">
                            <BsBuildings className='sidenav-icon'/>
                            Espacios
                        </a>
                    </li>

                    <li className='sidebar-menu-item__element'>
                        <a href="/admin/grupos" className="nav-link text-white menuA">
                            <MdOutlineInventory className='sidenav-icon'/>
                            Grupos
                        </a>
                    </li>

                    <li className='sidebar-menu-item__element'>
                        <a href="/admin/relaciones" className="nav-link text-white menuA">
                            <MdLineWeight className='sidenav-icon'/>
                            Distribuciones
                        </a>
                    </li>
                </ul>
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

export default SidebarAdmin