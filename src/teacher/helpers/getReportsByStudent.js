import axios from "axios";


export const getReportsByStudent = async (id) =>{
    try {
        const url = `http://localhost:8080/api-siblab/report/student/${id}`
        const response = await axios.get(url,{
            withCredentials:true
        });
        return response.data.data;
    }catch (err){
        return 'ERROR';
    }
}