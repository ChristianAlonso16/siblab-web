import React from 'react' //rafce
import { ListReportsAdmin } from '../pages/ListReportsAdmin';
import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarAdmin from '../components/SidebarAdmin';
import Laboratories from '../pages/Laboratories';
import RegisterTeacher from '../pages/RegisterTeacher';
import Inventory from '../pages/Inventory';
import Aulas from '../pages/Aulas';
import AulasComputer from '../pages/AulasComputer';
import RegisterQuater from '../pages/RegisterQuater';
 const AdminRouter = () => {
   return (
      <>
         <Routes>
         <Route path="listaReportes" element={<><SidebarAdmin /><ListReportsAdmin /></>} />
            <Route path="laboratorios" element={<><SidebarAdmin /><Laboratories /></>} />
            <Route path="aulas/:id" element={<><SidebarAdmin /><Aulas/></>} />
            <Route path="aulas/aula/:id" element={<><SidebarAdmin /><AulasComputer/></>} />
            <Route path="inventario" element={<><SidebarAdmin /><Inventory/></>} />
            <Route path="registrarCuatrimestre" element={<><SidebarAdmin /><RegisterQuater/></>} />
            <Route path="registrarDocente" element={<><SidebarAdmin /><RegisterTeacher/></>} />
            <Route path="/" element={<Navigate to={"/admin/listaReportes"} />} />
            <Route path="/*" element={<>no te ecnontre</>} />
         </Routes>
      </>
   )


}
export default AdminRouter;
