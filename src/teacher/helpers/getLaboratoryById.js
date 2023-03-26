import axios from "axios";


export const getLaboratoryById = async (id) =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://localhost:8080/api-siblab/laboratory/${id}`
        const response = await axios.get(url,{
            withCredentials: true,
        });
        return response.data.data;
    }catch (err){
        console.log(err);
        return 'ERROR';
    }
}