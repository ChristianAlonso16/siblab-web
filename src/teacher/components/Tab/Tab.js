import React, { useState } from 'react'
import { HistoryComponent } from '../history/HistoryComponent';
import {HistoryGroups} from '../historyGroup/HistoryGroups';
import Nav from 'react-bootstrap/Nav';


const Historial = () => {
    const [historialType, setHistorialType] = useState('personal');
    const Tab = () => {
        const handleHistorialTypeChange = (type) => {
            setHistorialType(type);
        };
        return (
            <div className='d-flex justify-content-center mt-3'>
                <Nav variant="pills"  defaultActiveKey="personal">
                    <Nav.Item>
                        <Nav.Link eventKey="personal" onClick={() => handleHistorialTypeChange('personal')}>Mi historial</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="grupos" onClick={() => handleHistorialTypeChange('grupos')}> Mis alumnos
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    };
    return (
        <div>
            <Tab />
            {historialType === 'personal' ? <HistoryComponent /> : <HistoryGroups />}
        </div>
    );
};

export default Historial