import axios from "axios";

const baseURL="https://todo-plcq.onrender.com/api/v1";
const Instance = axios.create({
    baseURL,
    headers:{
        token: window.localStorage.token
    }
});

export {Instance};