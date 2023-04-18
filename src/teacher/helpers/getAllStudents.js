import axios from "axios";


export const getAllStudents = async () =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://3.88.177.163:8080/api-siblab/user/`
        const response = await axios.get(url,{
            withCredentials: true,
        });
        return response.data.data;
    }catch (err){
        return 'ERROR';
    }
}