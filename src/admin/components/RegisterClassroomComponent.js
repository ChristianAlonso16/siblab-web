import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import Loading from '../../main/components/Loading';
const RegisterClassroomComponent = ({ onQuarter }) => {
    const [name, setName] = useState("");
    const [students, setStudents] = useState(0);
    const [career, setCareer] = useState("");
    const [grade, setGrade] = useState("");
    const [period, setPeriod] = useState("")
    const [loading, setLoading] = useState(false);

    const onQuart = async (event) => {
        console.log('name:',name,'students',students);
        event.preventDefault();
        setLoading(true);
        //await onQuarter({name, students,career,grade,period,setLoading });
    }
    if(loading) return <Loading/>;
    return (
        <div className="p-5 mt-2 container" style={{ marginLeft: "300px" }}>
            <div style={{ backgroundColor: "green", width: "850px", height: "30px", marginLeft: "97px" }}></div>
            <div className="container-md p-5 bg-white   shadow-lg" style={{ width: "850px" }} >
                <div className="p-5 ">
                    <form className="row g-3 " onSubmit={event => onQuart(event)}>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input value={name} onChange={text => setName(text.target.value)} type="text" className="form-control" id="name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaInicio" className="form-label">Numero de estudianates</label>
                            <input value={students} onChange={text => setStudents(text.target.value)} type="number" className="form-control" id="fechaInicio" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaFin" className="form-label">Carrera</label>
                            <input value={career} onChange={text => setCareer(text.target.value)} type="text" className="form-control" id="fechaFin" />
                        </div>
            
                        <div className="col-md-6">
                            <label htmlFor="selectGrade" className="form-label">Asignar grado</label>
                            <select className="form-select" aria-label="Default select example " id="selectGrade">
                                <option value>Asignar grado...</option>
                                <option value="1">Tsu Desarrollo de Sotware</option>
                                <option value="2">Lic Administracion </option>
                                <option value="3">Tsu Redes</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="selectPeriod" className="form-label">Asignar periodo</label>
                            <select className="form-select" aria-label="Default select example " id="selectPeriod">
                                <option value>Asignar periodo...</option>
                                <option value="1">5</option>  
                            </select>
                        </div>


                        <div className="col-12 d-flex justify-content-end">
                        <Button type="submit" className="btn btn-primary">
                        {loading?<FontAwesomeIcon icon={faSpinner} spin/> : "Registrar grupo"}
                    </Button>                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default RegisterClassroomComponent
RegisterClassroomComponent.propTypes = {
    title: PropTypes.string.isRequired
}

RegisterClassroomComponent.defaultProps = {
    title: "Hola mundo"
}