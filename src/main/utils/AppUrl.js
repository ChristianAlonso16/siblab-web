import axios from 'axios';
const apiUrl = axios.create({
    baseURL:'http://52.73.120.145:8080/api-siblab',
    withCredentials:true
});

apiUrl.interceptors.response.use(
    response =>{
        return response;

    },
    error => {
        return Promise.reject(error);
    }

);
apiUrl.interceptors.request.use(
    config =>{ 

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export default apiUrl;