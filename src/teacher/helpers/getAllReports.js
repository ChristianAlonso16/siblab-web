import axios from "axios";


export const getAllReports = async () =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://localhost:8080/api-siblab/report/`
        const response = await axios.get(url,{
            withCredentials: true
        });
        console.log(response);
        return response.data.data;
    }catch (err){
        return 'ERROR';
    }
}