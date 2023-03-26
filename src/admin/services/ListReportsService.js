import axios from "axios";


export const getAllStudents = async () =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://localhost:8080/api-siblab/user/`
        const response = await axios.get(url,{
            withCredentials: true,
        });
        return response.data.data;
    }catch (err){
        return 'ERROR';
    }
}
export const getAllAttachments = async () =>{
    try {
        const url = `http://localhost:8080/api-siblab/attachment/`
        const response = await axios.get(url,{
            withCredentials: true,
        });
        console.log(response.data.data)
        return response.data.data;
    }catch (err){
        console.log(err);
        return 'ERROR';
    }
}

export const getReport = async (id) =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://localhost:8080/api-siblab/report/${id}`
        const response = await axios.get(url,{
            withCredentials:true
        });
        return response.data.data;
    }catch (err){
        return 'ERROR';
    }
}
export const getLaboratoryById = async (id) =>{
    try {
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