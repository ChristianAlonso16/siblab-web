import axios from "axios";

export const getBuilding = async () =>{
    const url = 'http://localhost:8080/api-siblab/building/';
    const response  = await axios.get(url);
    console.log('respuesta de service',response);
    return response;
}