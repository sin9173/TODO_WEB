import Axios from "axios";
import { memberLogout } from "./Member";


export const apiConnectJson = async (method, url, data, userId) => {
    let result;

    let headers = {'Content-Type' : 'application/json'}

    if(userId) headers.userId = userId;

    await Axios({
        method : method,
        url : process.env.REACT_APP_SERVER_URL + url,
        data : data,
        headers : headers,
        withCredentials : true
    })
    .then((obj) => {
        console.log(obj.data);
        result = obj.data;
    })
    .catch((err) => {
        throw err;
    })

    if(result.result=='01') {
        await tokenRefresh();
        await apiConnectJson(method, url, data, userId)
        .then((obj) => {
            result = obj;
        })
        .catch((err) => {
            throw err;
        })
    }

    return result;
}

export const apiConnectParam = async (url, data, userId) => {
    let result;
    let headers = {};

    if(userId) headers.userId = userId;

    await Axios.get(process.env.REACT_APP_SERVER_URL + url, {
        params : data,
        headers : headers,
        withCredentials : true
    })
    .then((obj) => {
        console.log(obj.data);
        result = obj.data;
    })
    .catch((err) => {
        throw err;
    })

    if(result.result=='01') {
        await tokenRefresh();
        await apiConnectParam(url, data, userId)
        .then((obj) => {
            result = obj;
        })
        .catch((err) => {
            throw err;
        })
    }

    return result;
}

const tokenRefresh = async () => {
    let headers = {userId : localStorage.getItem('user_id')};

    await Axios.get(process.env.REACT_APP_SERVER_URL + '/token/refresh', {headers : headers, withCredentials : true})
    .then((obj) => {
        if(obj.data.result=='07') {
            alert(obj.data.message);
            memberLogout();
        }
        else if(obj.data.result!='00') alert(obj.data.message)
    })
    .catch((err) => {
        throw err;
    });
}