import axios from "axios";


export const getGroupById = async (id) =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://localhost:8080/api-siblab/classroom/${id}`
        console.log(document.cookie);
        const response = await axios.get(url,{
            withCredentials: true,
        });
        return response.data.data;
    }catch (err){
        console.log(err);
        return 'ERROR';
    }
}