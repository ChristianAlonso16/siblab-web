import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
const RegisterQuaterComponent = ({ onQuarter }) => {
    const [name, setName] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [docente, setDocente] = useState("");
    const [loading, setLoading] = useState(false);

    const onQuart = async (event) => {
        console.log(fechaInicio);
        event.preventDefault();
        setLoading(true);
        await onQuarter({name, fechaInicio, fechaFin, docente, setLoading });
    }
    return (
        <div className="p-5 mt-5 container" style={{ marginLeft: "300px" }}>
            <div style={{ backgroundColor: "green", width: "850px", height: "30px", marginLeft: "97px" }}></div>
            <div className="container-md p-5 bg-white   shadow-lg" style={{ width: "850px" }} >
                <div className="p-5 ">
                    <form className="row g-3 " onSubmit={event => onQuart(event)}>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label">Semestre</label>
                            <input value={name} onChange={text => setName(text.target.value)} type="text" className="form-control" id="name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaInicio" className="form-label">Fecha de inicio</label>
                            <input value={fechaInicio} onChange={text => setFechaInicio(text.target.value)} type="date" className="form-control" id="fechaInicio" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaFin" className="form-label">Fecha fin</label>
                            <input value={fechaFin} onChange={text => setFechaFin(text.target.value)} type="date" className="form-control" id="fechaFin" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="selectGroup" className="form-label">Asignar docente</label>
                            <select className="form-select" aria-label="Default select example " id="selectGroup">
                                <option value>Asignar docente...</option>
                                <option value="1">Jose Narvaez</option>
                                <option value="2">Celin santos</option>
                                <option value="3">Nora</option>
                            </select>
                        </div>


                        <div className="col-12 d-flex justify-content-end">
                        <Button type="submit" className="btn btn-primary">
                        {loading?<FontAwesomeIcon icon={faSpinner} spin/> : "Registrar cuatrimestre"}
                    </Button>                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default RegisterQuaterComponent
RegisterQuaterComponent.propTypes = {
    title: PropTypes.string.isRequired
}

RegisterQuaterComponent.defaultProps = {
    title: "Hola mundo"
}