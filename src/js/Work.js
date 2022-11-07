import { apiConnectJson, apiConnectParam } from "./ApiUtils";

//TODO 리스트 조회
export const workList = async (req_data) => {
    let result = {};
    await apiConnectParam("/work/list", req_data, localStorage.getItem('user_id'))
    .then((obj) => {
        if(obj.result!='00') alert(obj.message);
        else result = obj;
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    })

    return result;
}

//최근할일 조회
export const workRecent = async () => {
    let result = {};
    await apiConnectParam("/work/recent", {}, localStorage.getItem('user_id'))
    .then((obj) => {
        if(obj.result!='00' && obj.result!='08') alert(obj.message);
        else result = obj;
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });

    return result;
}

//할일 등록
export const workRegister = async (req_data) => {
    await apiConnectJson('POST', "/work", req_data, localStorage.getItem('user_id'))
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            alert('등록되었습니다.');
            window.location.href='/work/list';
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });
}

//할일 상태 수정
export const workModifyState = async (req_data) => {
    let result = false;
    await apiConnectJson('PUT', `/work/state/${req_data.id}`, req_data, localStorage.getItem('user_id'))
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            alert('수정되었습니다.');
            result = true;
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });
    return result;
}

//할일 내용 수정
export const workModifyContent = async (req_data) => {
    let result = false;
    await apiConnectJson('PUT', `/work/${req_data.id}`, req_data, localStorage.getItem('user_id'))
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            alert('수정되었습니다.');
            result = true;
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    }); 

    return result;

}