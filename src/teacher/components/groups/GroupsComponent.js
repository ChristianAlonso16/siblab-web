import 'bootstrap/dist/css/bootstrap.min.css';
import './GroupComponent.css'
import { useContext, useEffect, useState } from "react";
import { getAllGroups } from "../../helpers/getAllGroups";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../main/auth/AuthContext";
import Loading from "../../../main/components/Loading";
import { NoRecordsFound } from "../noRecordsFound/NoRecordsFoundComponent";
import apiUrl from '../../../main/utils/AppUrl';

export const GroupsComponent = () => {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const { user } = useContext(AuthContext);
    const [periods, setPeriods] = useState([]);
    const navigate = useNavigate();

    const fillGroups = async () => {
        setLoading(true);
        const response = await getAllGroups();
        if (response === 'ERROR') {
            setApiError(true);
        } else {
            let filter = [];
            for (let i of response) {
                if (i.period.user.id == user.id)
                    filter.push(i);
            }
            setGroups(filter);
        }
        setLoading(false);
    }
    const getPeriods = async () => {
        try {
            const response = await apiUrl.get("http://localhost:8080/api-siblab/period/");
            const data = response.data.data;
            console.log(data)
            setPeriods(data);
        } catch (error) {
            console.log("error de perio", error)
        }
    }
    useEffect(() => {
        getPeriods()
        fillGroups();
    }, []);
    const periodos = [
        { id: 1, nombre: "enero - abril", inicio: "1/1", fin: "30/4" },
        { id: 2, nombre: "mayo - agosto", inicio: "1/5", fin: "31/8" },
        { id: 3, nombre: "septiembre - diciembre", inicio: "1/9", fin: "31/12" }
    ];
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);

    const datosFiltrados = periods.filter((registro) => {
        const fechaInicio = new Date(registro.semester.semester_start).toLocaleDateString();
        const fechaFin = new Date(registro.semester.semester_finish).toLocaleDateString();
        if (!periodoSeleccionado) {
            return true;
        } else {
            const periodo = periodos.find(
                (p) => p.id === parseInt(periodoSeleccionado)
            );
            const inicioPeriodo = new Date(
                `${periodo.inicio}-${new Date().getFullYear()}`
            ).toLocaleDateString();
            const finPeriodo = new Date(
                `${periodo.fin}-${new Date().getFullYear()}`
            ).toDateString();
            return fechaInicio >= inicioPeriodo && fechaFin <= finPeriodo;
        }
    });
    return (loading ? <Loading /> : apiError ? <></> : groups.length < 1 ?
        <div style={{ marginLeft: '300px' }}><NoRecordsFound text={'Aún no tienes grupos'} /> </div> :
        <div className="container py-3 mt-3  " style={{ paddingLeft: "350px" }}>
               <select
                className="form-select"
                defaultValue={periodoSeleccionado}
                onChange={(e) => setPeriodoSeleccionado(e.target.value)}
            >
                <option value="">Seleccione un periodo</option>
                {periodos.map((periodo) => (
                    <option key={periodo.id} value={periodo.id}>
                        {periodo.nombre}
                    </option>
                ))}
            </select>
            <div className='container mt-2'>
                <div className='row'>
                    {groups.map(group => (
                        <div className='col-6 p-3'>
                            <div className='card car p-3' onClick={() => navigate(`/docente/reports/${group.id}`)}>
                                <div className='headerCar'>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <svg width="153" height="62" viewBox="0 0 153 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M56.6662 31C53.0254 31 49.505 29.383 46.7496 26.4486C44.0703 23.5864 42.4341 19.7695 42.1454 15.7043C41.8373 11.3678 43.1672 7.38011 45.8889 4.47386C48.6107 1.56761 52.4162 0 56.6662 0C60.886 0 64.7022 1.59579 67.4151 4.49499C70.1545 7.42238 71.488 11.4031 71.1798 15.7025C70.8841 19.773 69.2496 23.5882 66.5757 26.4468C63.8274 29.383 60.3088 31 56.6662 31ZM80.0109 61.9999H33.3232C32.5725 62.0039 31.831 61.8366 31.1556 61.5108C30.4802 61.1849 29.8889 60.7093 29.4274 60.1206C28.9377 59.4823 28.5996 58.7421 28.4383 57.9554C28.277 57.1688 28.2967 56.356 28.4959 55.578C29.9869 49.6228 33.6809 44.684 39.1775 41.2969C44.0561 38.292 50.2664 36.6363 56.6662 36.6363C63.1917 36.6363 69.239 38.2215 74.146 41.2247C79.655 44.5942 83.3543 49.5612 84.8382 55.5886C85.035 56.3672 85.0525 57.1799 84.8894 57.9662C84.7263 58.7524 84.3867 59.4919 83.8961 60.1294C83.435 60.7154 82.8451 61.1887 82.1717 61.5129C81.4982 61.8372 80.7591 62.0037 80.0109 61.9999ZM23.1976 31.7045C16.9661 31.7045 11.4871 25.9413 10.9789 18.8589C10.7275 15.2305 11.8643 11.8751 14.1664 9.41448C16.4437 6.97851 19.6559 5.63636 23.1976 5.63636C26.7392 5.63636 29.9267 6.98556 32.2164 9.43562C34.5362 11.9156 35.6695 15.264 35.4039 18.8624C34.8957 25.9431 29.4185 31.7045 23.1976 31.7045ZM34.8248 37.244C31.7099 35.7292 27.6672 34.9718 23.1994 34.9718C17.9825 34.9718 12.9162 36.3246 8.93184 38.7799C4.41446 41.5681 1.37573 45.6281 0.148548 50.5299C-0.0310401 51.235 -0.048026 51.9713 0.0988609 52.6838C0.245748 53.3964 0.552705 54.0666 0.996772 54.6445C1.41814 55.1825 1.95795 55.6173 2.57469 55.9153C3.19144 56.2133 3.86869 56.3667 4.55436 56.3636H24.2105C24.5423 56.3635 24.8635 56.2477 25.1182 56.0362C25.3729 55.8247 25.5448 55.531 25.6041 55.2064C25.6236 55.0954 25.6484 54.9844 25.6767 54.8752C27.1784 48.876 30.697 43.8068 35.8962 40.1115C36.0874 39.9744 36.2412 39.792 36.3437 39.5808C36.4461 39.3697 36.494 39.1364 36.4829 38.9022C36.4718 38.668 36.4021 38.4402 36.2802 38.2396C36.1583 38.0389 35.9879 37.8717 35.7846 37.753C35.5066 37.591 35.1878 37.4201 34.8248 37.244Z" fill="#323232" />
                                                <path d="M124.666 31C121.025 31 117.505 29.383 114.75 26.4486C112.07 23.5864 110.434 19.7695 110.145 15.7043C109.837 11.3678 111.167 7.38011 113.889 4.47386C116.611 1.56761 120.416 0 124.666 0C128.886 0 132.702 1.59579 135.415 4.49499C138.155 7.42238 139.488 11.4031 139.18 15.7025C138.884 19.773 137.25 23.5882 134.576 26.4468C131.827 29.383 128.309 31 124.666 31ZM148.011 61.9999H101.323C100.573 62.0039 99.831 61.8366 99.1556 61.5108C98.4802 61.1849 97.8889 60.7093 97.4274 60.1206C96.9377 59.4823 96.5996 58.7421 96.4383 57.9554C96.277 57.1688 96.2967 56.356 96.4959 55.578C97.9869 49.6228 101.681 44.684 107.178 41.2969C112.056 38.292 118.266 36.6363 124.666 36.6363C131.192 36.6363 137.239 38.2215 142.146 41.2247C147.655 44.5942 151.354 49.5612 152.838 55.5886C153.035 56.3672 153.053 57.1799 152.889 57.9662C152.726 58.7524 152.387 59.4919 151.896 60.1294C151.435 60.7154 150.845 61.1887 150.172 61.5129C149.498 61.8372 148.759 62.0037 148.011 61.9999ZM91.1976 31.7045C84.9661 31.7045 79.4871 25.9413 78.9789 18.8589C78.7275 15.2305 79.8643 11.8751 82.1664 9.41448C84.4437 6.97851 87.6559 5.63636 91.1976 5.63636C94.7392 5.63636 97.9267 6.98556 100.216 9.43562C102.536 11.9156 103.67 15.264 103.404 18.8624C102.896 25.9431 97.4185 31.7045 91.1976 31.7045ZM102.825 37.244C99.7099 35.7292 95.6672 34.9718 91.1994 34.9718C85.9825 34.9718 80.9162 36.3246 76.9318 38.7799C72.4145 41.5681 69.3757 45.6281 68.1485 50.5299C67.969 51.235 67.952 51.9713 68.0989 52.6838C68.2457 53.3964 68.5527 54.0666 68.9968 54.6445C69.4181 55.1825 69.9579 55.6173 70.5747 55.9153C71.1914 56.2133 71.8687 56.3667 72.5544 56.3636H92.2105C92.5423 56.3635 92.8635 56.2477 93.1182 56.0362C93.3729 55.8247 93.5448 55.531 93.6041 55.2064C93.6236 55.0954 93.6484 54.9844 93.6767 54.8752C95.1784 48.876 98.697 43.8068 103.896 40.1115C104.087 39.9744 104.241 39.792 104.344 39.5808C104.446 39.3697 104.494 39.1364 104.483 38.9022C104.472 38.668 104.402 38.4402 104.28 38.2396C104.158 38.0389 103.988 37.8717 103.785 37.753C103.507 37.591 103.188 37.4201 102.825 37.244Z" fill="#323232" />
                                            </svg>
                                        </div>
                                        <div className='col-4'>
                                            <div className='margen'></div>
                                            <div className='margen2'></div>
                                            <div className='margen3'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-4 texto'>
                                            <p>Ingeniería</p>
                                            <p>{group.period.semester.name + group.name}</p>
                                        </div>
                                        <div className='col-8 texto'>
                                            <div className='verticalLin'>
                                                <p>{group.career}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}