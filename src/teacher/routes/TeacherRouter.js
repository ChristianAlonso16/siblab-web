import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
const TeacherRouter = () => { //rest cargar todas las props
<>
<Routes>
        <Route path="listaReportes" element={<>Docente</>} />
        <Route path="/" element={<Navigate to={"/docente/listaReportes"}/>} />
        <Route path="/*" element={<>404</>} />

    </Routes>
</>
    

}
export default TeacherRouter;