import axios from "axios";


export const AuthorizeFailReport = async (id,data) =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://3.88.177.163:8080/api-siblab/report/${id}`;
        const response = await axios.put(url,data,{
            withCredentials: true,
        });
        return response.data.data;
    }catch (err){
        console.log(err);
        return 'ERROR';
    }
}