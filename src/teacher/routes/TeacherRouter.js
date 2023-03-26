import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {SidebarTeacher} from "../components/sidebarTeacher/SidebarTeacher";
import {ListReportsPage} from "../pages/ListReportsPage";
import {MyGroupsPage} from "../pages/MyGroupsPage";
import {ReportsPage} from "../pages/ReportsPage";
import {CreateReportPage} from "../pages/CreateReportPage";
import {HistoryPage} from "../pages/HistoryPage";
import {CreateNewReportPage} from "../pages/CreateNewReportPage";
import PageNotFound from '../../main/pages/PageNotFound';
const TeacherRouter = () => {
return(
    <Routes>
        <Route path="ListReports" element={<><SidebarTeacher/><ListReportsPage/></>} />
        <Route path='myGroups' element={<> <SidebarTeacher/> <MyGroupsPage/> </>} />
        <Route path='reports/:group' element={ <> <SidebarTeacher/> <ReportsPage/> </> } />
        <Route path='createReport' element={ <> <SidebarTeacher/> <CreateNewReportPage/> </> } />
        <Route path='history'  element={ <> <SidebarTeacher/> <HistoryPage/> </> } />
        <Route path="/" element={<Navigate to={"/docente/ListReports"}/>} />
        <Route path="/*" element={<PageNotFound />} />
    </Routes>
)
    

}
export default TeacherRouter;