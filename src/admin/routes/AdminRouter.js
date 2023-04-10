import React from 'react' //rafce
import { ListReportsAdmin } from '../pages/ListReportsAdmin';
import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarAdmin from '../components/SidebarAdmin';
import Laboratories from '../pages/Laboratories';
import Inventory from '../pages/Inventory';
import Aulas from '../pages/Aulas';
import AulasComputer from '../pages/AulasComputer';
import PageNotFound from '../../main/pages/PageNotFound';
import GetTeachers from '../pages/GetTeachers';
import GetQuaters from '../pages/GetQuaters';
import GetGroups from '../pages/GetGroups';
import Relations from '../pages/Relations';
 const AdminRouter = () => {
   return (
      <>
         <Routes>
         <Route path="listaReportes" element={<><SidebarAdmin /><ListReportsAdmin /></>} />
            <Route path="laboratorios" element={<><SidebarAdmin /><Laboratories /></>} />
            <Route path="aulas/:id" element={<><SidebarAdmin /><Aulas/></>} />
            <Route path="aulas/aula/:id" element={<><SidebarAdmin /><AulasComputer/></>} />
            <Route path="inventario" element={<><SidebarAdmin /><Inventory/></>} />
            <Route path="docentes" element={<><SidebarAdmin /><GetTeachers/></>} />
            <Route path="grupos" element={<><SidebarAdmin /><GetGroups/></>} />
            <Route path="cuatrimestres" element={<><SidebarAdmin /><GetQuaters/></>} />
            <Route path="relaciones" element={<><SidebarAdmin /><Relations/></>} />
            <Route path="/" element={<Navigate to={"/admin/listaReportes"} />} />
            <Route path="/*" element={<PageNotFound />} />
         </Routes>
      </>
   )


}
export default AdminRouter;
