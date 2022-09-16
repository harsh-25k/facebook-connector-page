//This includes all Backend Services Call

import axios from "axios";
export const API_CLIENT = {
    get(URL){
        const promise = axios.get(URL);
        return promise;
    },
    post(URL, data){
        console.log("Data ",data)
        const promise = axios.post(URL, data);
        return promise;
    },
    delete(URL, data){

    }
}