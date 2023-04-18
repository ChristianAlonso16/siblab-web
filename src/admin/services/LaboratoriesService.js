import axios from "axios";
import apiUrl from "../../main/utils/AppUrl";

export const getBuilding = async () =>{
    const url = 'http://3.88.177.163:8080/api-siblab/building/';
    const response  = await apiUrl.get("/building/");
    console.log('respuesta de service',response);
    return response;
}