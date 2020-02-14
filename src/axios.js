import axios from "axios";
import store from "./store/index";


const gloablaxios = axios.create({
    baseURL: 'http://localhost:3000/recipes'
});

gloablaxios.interceptors.request.use(function (config) {
    store.dispatch("toogleLoading");
    return config;
}, function (error) {
    store.dispatch("toogleLoading");
    return Promise.reject(error);
});

gloablaxios.interceptors.response.use(function (response) {
    store.dispatch("toogleLoading");
    return response;
}, function (error) {
    store.dispatch("toogleLoading");
    return Promise.reject(error);
});

export default gloablaxios;