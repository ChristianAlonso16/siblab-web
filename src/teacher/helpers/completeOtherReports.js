import axios from "axios";


export const completeOtherReports = async (machineId,attachment) =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://localhost:8080/api-siblab/report/`;
        const request = {
            status:'Created_teacher', defect:true,
            id_teacher:user.id, time_Register: new Date().toISOString().replace('T', ' ').substr(0, 19),
            time_Finish: new Date().toISOString().replace('T', ' ').substr(0, 19),
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