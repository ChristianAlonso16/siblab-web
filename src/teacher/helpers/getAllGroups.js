import axios from "axios";


export const getAllGroups = async () =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://3.88.177.163:8080/api-siblab/classroom/`
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