import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterDocenteComponent = () => {
  return (
    <div className="p-5 container mt-2  " style={{marginLeft: "300px"}}>
    <div  style={{backgroundColor: "green", width: "850px", height: "30px", marginLeft: "97px"}}></div>
    <div className="container-md p-5 bg-white shadow" style={{width: "850px"}} >
        <div className="p-5 ">
            <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Nombre(s)</label>
                        <input type="email" className="form-control" id="inputEmail4"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">Correo electronico</label>
                        <input type="password" className="form-control" id="inputPassword4"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Apellido materno</label>
                        <input type="email" className="form-control" id="inputEmail4"/>
                    </div>
            
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="inputPassword4"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Apellido paterno</label>
                    <input type="email" className="form-control" id="inputEmail4"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="selectGroup" className="form-label">Asignar grupo</label>
                    <select className="form-select"  id="selectGroup">
                        <option selected>Asignar grupo...</option>
                        <option>2B</option>
                        <option>5B</option>
                        <option>8B</option>
                    </select>
                </div>
                

                <div className="col-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Registrar docente</button>
                </div>
            </form>
        </div>
    </div>
</div>

    )
}

export default RegisterDocenteComponent