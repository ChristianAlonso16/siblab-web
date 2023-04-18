import axios from "axios";


export const getReportsByStudent = async (id) =>{
    try {
        const url = `http://3.88.177.163:8080/api-siblab/report/student/${id}`
        const response = await axios.get(url,{
            withCredentials:true
        });
        return response.data.data;
    }catch (err){
        return 'ERROR';
    }
}