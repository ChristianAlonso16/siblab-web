import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getBuilding } from '../services/LaboratoriesService';
import Loading from '../../main/components/Loading'
import { BsFillBuildingFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import docencia4 from "../assets/images/docencia4.jpg"
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

    return (loading ? <Loading /> : apiError ? <></> : building.length < 1 ?
        <div style={{ marginLeft: '300px' }}><NoRecordsFound text={'Aún no tienes laboratorios'} /> </div> :
        <div className="container py-5 mt-5  " style={{ width: "50%", marginLeft: "490px"}}>
            <div className=" row g-3 d-flex" >
                {building.map((build) => (
                    <div className="col-6 d-flex justify-content-end " key={build.id} >
                        <div className="col">
                            <div className="row g-0">
                                <Card style={{ width: '18rem', cursor: "pointer" }} onClick={() => irAulas(build.id)}>
                                    <Card.Img variant="top" src={docencia4} />
                                    <Card.Body >
                                        <Card.Title>{build.name}</Card.Title>
                                        <Card.Text>
                                            {build.location}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default LaboratoriesComponent