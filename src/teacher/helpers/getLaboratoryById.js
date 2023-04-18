import axios from "axios";


export const getLaboratoryById = async (id) =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://3.88.177.163:8080/api-siblab/laboratory/${id}`
        const response = await axios.get(url,{
            withCredentials: true,
        });
        return response.data.data;
    }catch (err){
        console.log(err);
        return 'ERROR';
    }
}