import axios from "axios";
import apiUrl from "../../main/utils/AppUrl";

export const getInventory = async () =>{
    const url = 'http://localhost:8080/api-siblab/machine/';
    const response  = await apiUrl.get("/machine/");
    console.log('respuesta de service',response);
    return response;
}

export const addMachine = async(form) =>{
    try {
        const machineBean = {
            name: form.name,
            brand: form.brand,
            hard_disk: form.hard_disk,
            cpu: form.cpu,
            status: 1,
            specific_features: form.specific_features,
            id_laboratory:{
                id:form.aula
            }
        };
        const url = 'http://localhost:8080/api-siblab/image';
        const response = await apiUrl.post("/machine/",machineBean);
        if (response.status === 201) {
            const id = response.data.data.id;
            const formDataImagen = new FormData();
            formDataImagen.append("image", form.image);
            formDataImagen.append("METHOD", "POST");
            
           const imageRes= await axios.post(`${url}/${id}`, formDataImagen,{
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
           });
          }
        return response;
    } catch (error) {
        console.log('error desde addComputer',error);
    }
  
}