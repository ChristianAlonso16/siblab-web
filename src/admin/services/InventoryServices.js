import axios from "axios";

export const getInventory = async () =>{
    const url = 'http://localhost:8080/api-siblab/machine/';
    const response  = await axios.get(url);
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
        const url = 'http://localhost:8080/api-siblab/machine/';
        const response = await axios.post(url,machineBean);
        if (response.status === 201) {
            const id = response.data.data.id;
            const formDataImagen = new FormData();
            formDataImagen.append("image", form.image);
            formDataImagen.append("METHOD", "POST");
            
           const imageRes= await axios.post(`http://localhost:8080/api-siblab/image/${id}`, formDataImagen,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
           });
          }
        return response;
    } catch (error) {
        console.log('error desde addComputer',error);
    }
  
}