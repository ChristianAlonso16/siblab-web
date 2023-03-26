import {CreateReportComponent} from "../components/createReport/CreateReportComponent";
import {useEffect, useState} from "react";
import {getAllGroups} from "../helpers/getAllGroups";
import {getAllBuildings} from "../helpers/getAllBuildings";
import {getAllLaboratories} from "../helpers/getAllLaboratories";


export const CreateNewReportPage = () =>{

    const [groups, setGroups] = useState([]);
    const [laboratories, setLaboratories] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    useEffect(()=>{
        fillData();
    },[]);

    const fillData = async () =>{
        setLoading(true);
        const [rGroup, rBuild, rLab] = await Promise.all([
            getAllGroups(),
            getAllBuildings(),
            getAllLaboratories()
        ]);
        if ((rGroup === 'ERROR') || (rBuild === 'ERROR') || (rLab === 'ERROR')){
            setApiError(true);
        }else {
            setApiError(false);
            setGroups(rGroup);
            setLaboratories(rLab);
            setBuildings(rBuild);
        }
        setLoading(false);
    }

    return(
        <CreateReportComponent groups={groups} laboratories={laboratories} buildings={buildings}/>
    )
}