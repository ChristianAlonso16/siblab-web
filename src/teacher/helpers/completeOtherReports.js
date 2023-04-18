import axios from "axios";

const actualDate = () =>{
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const hora = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');
    return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
}

export const completeOtherReports = async (machineId,attachment) =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://3.88.177.163:8080/api-siblab/report/`;
        const request = {
            status:'Created_teacher', defect:true,
            id_teacher:user.id, time_Register: actualDate(),
            time_Finish: actualDate(),
            machine:{id: parseInt( machineId )},
            info: 'Computadoras no reportadas que se encuentran en mal estado',
            ...attachment
        }
        console.log(request);
        const response = await axios.post(url,request, {
            withCredentials: true,
        });
        return response.data.data;
    }catch (err){
        console.log(err);
        return 'ERROR';
    }
}