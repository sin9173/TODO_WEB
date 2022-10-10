import Axios from "axios";


export const apiConnectPost = async (url, data, token) => {
    let result;

    let headers = {'Content-Type' : 'application/json'}

    if(token) headers.token = token;

    await Axios({
        method : 'POST',
        url : process.env.REACT_APP_SERVER_URL + url,
        data : data,
        headers : headers
    })
    .then((obj) => {
        console.log(obj.data);
        result = obj.data;
    })
    .catch((err) => {
        throw err;
    })

    return result;
}

export const apiConnectGet = async (url, data, token) => {
    let result;
    let headers = {};

    if(token) headers.token = token;

    await Axios.get(process.env.REACT_APP_SERVER_URL + url, {
        params : data,
        headers : headers
    })
    .then((obj) => {
        console.log(obj.data);
        result = obj.data;
    })
    .catch((err) => {
        throw err;
    })

    return result;
}