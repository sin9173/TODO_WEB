import { apiConnectGet, apiConnectPost } from "./ApiUtils";
import { memberLogout } from "./Member";

//TODO 리스트 조회
export const workList = async (req_data) => {
    let result = {};

    const token = sessionStorage.getItem('token');
    if(!token) {
        alert("로그인해주세요.");
        memberLogout();
    }

    await apiConnectGet("/work/list", req_data, token)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message);
        if(obj.result=='01') memberLogout();
        if(obj.result=='00') result = obj;
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
    const token = sessionStorage.getItem('token');
    if(!token) {
        alert("로그인해주세요.");
        memberLogout();
    }

    await apiConnectGet("/work/recent", {}, token)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message);
        if(obj.result=='01') memberLogout();
        if(obj.result=='00') result = obj;
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });

    return result;
}

//할일 등록
export const workRegister = async (req_data) => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        alert('로그인해주세요.');
        window.location.href='/member/login';
    }
    await apiConnectPost("/work/register", req_data, token)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        if(obj.result=='01') memberLogout();
        if(obj.result=='00') {
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
export const workModifyState = async (req_data, page) => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        alert('로그인해주세요.');
        window.location.href='/member/login';
    }
    await apiConnectPost("/work/modify/state", req_data, token)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        if(obj.result=='01') memberLogout();
        if(obj.result=='00') {
            alert('수정되었습니다.');
            window.location.href=`/work/list?page=${page}`;
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });

    
}

//할일 내용 수정
export const workModifyContent = async (req_data, page) => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        alert('로그인해주세요.');
        window.location.href='/member/login';
    }
    await apiConnectPost("/work/modify/info", req_data, token)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        if(obj.result=='01') memberLogout();
        if(obj.result=='00') {
            alert('수정되었습니다.');
            window.location.href=`/work/list?page=${page}`;
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });

    
}