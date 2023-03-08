import React from 'react' //rafce
import { ListReportsAdmin } from '../pages/ListReportsAdmin';
import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarAdmin from '../components/SidebarAdmin';
import Laboratories from '../pages/Laboratories';

 const AdminRouter = () => {
   return (
      <>
         <Routes>
         <Route path="listaReportes" element={<><SidebarAdmin /><ListReportsAdmin /></>} />
            <Route path="laboratorios" element={<><SidebarAdmin /><Laboratories /></>} />
            <Route path="aulas" element={<><SidebarAdmin />Hola Aulas</>} />
            <Route path="inventario" element={<><SidebarAdmin />Hpla Inventory</>} />
            <Route path="registrarCuatrimestre" element={<><SidebarAdmin />Hola RegistrarCuatrimestre</>} />
            <Route path="registrarDocente" element={<><SidebarAdmin />Hola RegistrarDocente</>} />
            <Route path="/" element={<Navigate to={"/admin/listaReportes"} />} />
            <Route path="/*" element={<>no te ecnontre</>} />
         </Routes>
      </>
   )


}
export default AdminRouter;
