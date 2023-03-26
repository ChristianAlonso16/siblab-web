import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getBuilding } from '../services/LaboratoriesService';
import Loading from '../../main/components/Loading'
import { BsFillBuildingFill } from 'react-icons/bs';
import "../assets/css/laboratories.css"
import { NoRecordsFound } from '../../teacher/components/noRecordsFound/NoRecordsFoundComponent';
const LaboratoriesComponent = () => {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [building, setBuilding] = useState([]);
    useEffect(() => {
        const findLab = async () => {
            setLoading(true);
            try {
                const response = await getBuilding();
                setBuilding(response.data.data);
            } catch (error) {
                setLoading(false);
                setApiError(true);
            }
            setLoading(false);

        }
        findLab()
    }, [])


    const navigate = useNavigate();

    const irAulas = (id) => {
        const laboratoriesArray = building.map(({ laboratories }) => laboratories);
        console.log("laboratories", laboratoriesArray);
        navigate(`/admin/aulas/${id}`)

    }

    return ( loading ? <Loading /> : apiError ? <></> : building.length < 1 ?
    <div style={{marginLeft:'300px'}}><NoRecordsFound text ={'Aún no tienes laboratorios'}/> </div>:
        <div className="container-md py-5 mt-5  " style={{ paddingLeft: "80px" }}>
            <div className=" row g-3 d-flex" >
                {building.map((build) => (

                    <div className="col-md-6 d-flex justify-content-end " key={build.id} >
                        <div className="col-lg-7">
                            <div className="card rounded-5  cardLaboratory" onClick={() => irAulas(build.id)}>
                                <div className="row g-0 ">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block text-center pt-2">
                                        <BsFillBuildingFill size={100} />
                                    </div>
                                    <div className="col  d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5  text-white">
                                            {build.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default LaboratoriesComponent