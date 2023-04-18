import axios from "axios";


export const ResolveProvelms = async(id, attachId) =>{
    try{
        const data = {
            status: 'Review_admin',
            defect: false,
            attachment:{id: attachId}
        }
        console.log(data, '-----------------');
        const url = `http://3.88.177.163:8080/api-siblab/report/${id}`;
        const response = await axios.put(url,data,{
            withCredentials:true,
        })
        return response.data.data;
    }catch(error){
        console.log(error);
        return 'ERROR';
    }
}

export const DisableMachine = async(id, attachId, machineId) =>{
    try{
        const data = {
            status: 'Review_admin',
            defect: true,
            attachment:{id: attachId}
        }
        const url = `http://3.88.177.163:8080/api-siblab/report/${id}`;
        const response = await axios.put(url,data,{
            withCredentials:true,
        });

        const url2 = `http://3.88.177.163:8080/api-siblab/machine/${machineId}`;
        const responseComputer = await axios.delete(url2,{
            withCredentials:true,
        });

        return response && responseComputer;
    }catch(error){
        console.log(error);
        return 'ERROR';
    }
}