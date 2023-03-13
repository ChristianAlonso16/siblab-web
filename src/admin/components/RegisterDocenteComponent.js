import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const RegisterDocenteComponent = ({onTeach}) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const onTeacher = async(event) =>{
        
        console.log("Registrado",name);
        event.preventDefault();
        setLoading(true);
        await onTeach({name,surname,email,password,setLoading});
    }
  return (
    <div className="p-5 container mt-2  " style={{marginLeft: "300px"}}>
    <div  style={{backgroundColor: "green", width: "850px", height: "30px", marginLeft: "97px"}}></div>
    <div className="container-md p-5 bg-white shadow" style={{width: "850px"}} >
        <div className="p-5 ">
            <form className="row g-3" onSubmit={event=>onTeacher(event)}>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Nombre(s)</label>
                        <input value={name} onChange={text =>setName(text.target.value)} type="text" className="form-control" id="inputEmail4"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">Correo electronico</label>
                        <input value={email} onChange={text=>setEmail(text.target.value)} type="text" className="form-control" id="inputPassword4"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Apellido materno</label>
                        <input  type="text" className="form-control" id="inputEmail4"/>
                    </div>
            
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
                    <input value={password} onChange={text=>setPassword(text.target.value)} type="password" className="form-control" id="inputPassword4"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Apellido paterno</label>
                    <input value={surname} onChange={text=>setSurname(text.target.value)} type="text" className="form-control" id="inputEmail4"/>
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
                    <Button type="submit" className="btn btn-primary">
                        {loading?<FontAwesomeIcon icon={faSpinner} spin/> : "Registrar docente"}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</div>

    )
}

export default RegisterDocenteComponent

RegisterDocenteComponent.propTypes = {
    title: PropTypes.string.isRequired
  }
  
  RegisterDocenteComponent.defaultProps = {
    title: "Hola mundo"
  }