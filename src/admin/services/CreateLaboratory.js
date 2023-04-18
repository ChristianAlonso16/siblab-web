import axios from "axios";

export const CreateLaboratory = async(data) =>{
    try{
        const url = `http://3.88.177.163:8080/api-siblab/laboratory/`;
        const response = await axios.post(url,data,{
            withCredentials:true,
        })
        return response.data.data;
    }catch(error) {
        console.log(error);
        return 'ERROR';
    }
}