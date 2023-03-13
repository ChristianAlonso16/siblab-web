import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getBuilding } from '../services/LaboratoriesService';
import Loading from '../../main/components/Loading'
const LaboratoriesComponent = () => {
    const [building, setBuilding] = useState([]);

    useEffect(() => {
        const findLab = async () => {
            const response = await getBuilding();
            setBuilding(response.data.data);
        }
        findLab()
    }, [])
    const navigate = useNavigate();

    const irAulas = () => {
        navigate("/admin/aulas")
    }
    if (!building.length) return <Loading />

    return (
        <div className="container-md py-5 mt-5  " style={{ paddingLeft: "80px" }}>
            <div className=" row g-3 d-flex">
                {building.map((build) => (

                    <div className="col-md-6 d-flex justify-content-end " key={build.id} >
                        <div className="col-lg-7">
                            <div className="card rounded-5 bg-secondary" onClick={irAulas}>
                                <div className="row g-0 ">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="./docencia.png" className="img-fluid rounded-5" alt="" />
                                    </div>
                                    <div className="col  d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-white">
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