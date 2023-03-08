import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/sidebarAdmin.css';

const SidebarAdmin = () => {
  return (
    <div className="container-fluid  h-100 rounded">
    <div className="d-flex flex-column col-md-3 flex-shrink-0 p-3 text-white sidebar bgAdmin">
        <a href="docencia.png" className="d-flex aling-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <img className="imagen" src="libro.png" alt="Profesor"/>
            <span className="fs-4 mb-4">Docente</span>
        </a>
        <h4>Bernardo Huicochea Naranjo</h4>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <a href="/admin/listaReportes" className="nav-link text-white menu" aria-current="page">
                    Lista de Reportes
                </a>
            </li>
            <li>
                <a href="/admin/laboratorios" className="nav-link text-white menu">
                    Espacios
                </a>
            </li>
            <li>
                <a href="/admin/registrarDocente" className="nav-link text-white menu">
                    Docentes
                </a>
            </li>
            <li>
                <a href="/admin/inventario" className="nav-link text-white menu">
                    inventario
                </a>
            </li>
        </ul>
        <hr/>
        <a href="login.html" className="nav-link text-white">
            <img className="imagen" src="cargarArchivo.png" alt="Cerrar_Sesion"/>
            Cerrar Sesión
        </a>
    </div>
</div>
    )
}

export default SidebarAdmin