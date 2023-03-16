import axios from "axios";
export const getAulas = async() =>{

    const url = "http://localhost:8080/api-siblab/laboratory/";
    const response = await axios.get(url);
    console.log('respuesta de AulasService',response.data.data);

    return response;
}

export const getComputerAulas = async()=>{
    const url = "http://localhost:8080/api-siblab/machine/";
        const response  = await axios.get(url);
        console.log('respuesta de service',response);
        return response;
    
}