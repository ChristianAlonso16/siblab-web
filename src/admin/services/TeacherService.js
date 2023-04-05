import apiUrl from "../../main/utils/AppUrl";

export const RegisterT = async (form) => {
    console.log('serviceT',form)

    try {
        const dataTeacher = {
            name: form.name,
            surname: form.surname,
            email: form.email,
            password: form.password,
            role: 'Teacher'
        };
       const url = 'http://localhost:8080/api-siblab/user/';
       const response = await apiUrl.post(url,dataTeacher);
       
       return response;
    } catch (error) {
        console.log("eror de tService",error)
    }
}
export const EditT = async (form) => {
    console.log('serviceT',form)

    try {
        const dataTeacher = {
            name: form.values.name,
            surname: form.values.surname,
            email: form.values.email,
            password: form.values.password,
            role: 'Teacher'
        };
       const url = `http://localhost:8080/api-siblab/user/${form.id}`;
       const response = await apiUrl.put(url,dataTeacher);
       
       return response;
    } catch (error) {
        console.log("eror de tService",error)
    }
}
export const GetTeacher= async() =>{
    try {
        const url = 'http://localhost:8080/api-siblab/user/';
        const response = await apiUrl.get(url);
        return response.data.data;
    } catch (error) {
        console.log("Error desde getTeachers")
    }
}
export const GetTeacherById= async(id) =>{
    try {
        const url = `http://localhost:8080/api-siblab/user/${id}`;
        const response = await apiUrl.get(url);
        return response.data.data;
    } catch (error) {
        console.log("Error desde getTeachers")
    }
}
export const ChangeStatus= async(id) =>{
    try {
        const url = `http://localhost:8080/api-siblab/user/${id}`;
        const response = await apiUrl.delete(url);
        return response.data.data;
    } catch (error) {
        console.log("Error desde changeStatus")
    }
}


