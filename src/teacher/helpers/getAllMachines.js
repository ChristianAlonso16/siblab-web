import axios from "axios";


export const getAllMachines = async () =>{
    try {
        const user = await JSON.parse(localStorage.getItem('user'));
        const url = `http://3.88.177.163:8080/api-siblab/book/`
        const response = await axios.get(url,{});
        console.log(response);
        return response;
    }catch (err){
        return 'ERROR';
    }

}