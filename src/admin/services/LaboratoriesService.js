import axios from "axios";
import apiUrl from "../../main/utils/AppUrl";

export const getBuilding = async () =>{
    const url = 'http://localhost:8080/api-siblab/building/';
    const response  = await apiUrl.get("/building/");
    console.log('respuesta de service',response);
    return response;
}