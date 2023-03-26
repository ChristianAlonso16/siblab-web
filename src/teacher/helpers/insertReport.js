import axios from "axios";


export const insertReport = async (report) =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://localhost:8080/api-siblab/report/`
        const response = await axios.post(url,report);
        console.log(response);
        return response;
    }catch (err){
        return 'ERROR';
    }
}