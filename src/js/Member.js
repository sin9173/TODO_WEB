import { apiConnectPost } from "./ApiUtils"

//로그인
export const login = async (req_data) => {
    await apiConnectPost("/member/login", req_data)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            sessionStorage.setItem("token", obj.token);
            localStorage.setItem("user_id", obj.user_id);
            localStorage.setItem("nick_name", obj.nick_name);
            window.location.href='/work/list';
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    })
}

//회원가입
export const memberRegister = async (req_data) => {
    let check = true;
    
    //아이디체크
    await apiConnectPost("/member/idcheck", req_data)
    .then((obj) => {
        if(obj.result!='00') {
            alert(obj.message);
            check=false;
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });

    if(!check) return check;

    //등록
    await apiConnectPost("/member/register", req_data)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            alert('가입되었습니다.');
            window.location.href='/member/login';
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });
}

//회원 탈퇴
export const memberDelete = async (req_data) => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        alert('로그인해주세요.');
        window.location.href='/member/login';
    }
    await apiConnectPost("/member/delete", req_data, token)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            alert('삭제되었습니다.');
            window.location.href='/member/login';
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });
}

//회원 비밀번호 수정
export const memberPasswordModify = async (req_data) => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        alert('로그인해주세요.');
        window.location.href='/member/login';
    }
    await apiConnectPost("/member/modify/password", req_data, token)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            alert('수정되었습니다.');
            window.location.href='/work/list';
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });
}

//회원 정보 수정
export const memberInfoModify = async (req_data) => {
    const token = sessionStorage.getItem('token');
    if(!token) {
        alert('로그인해주세요.');
        window.location.href='/member/login';
    }
    await apiConnectPost("/member/modify/info", req_data, token)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            alert('수정되었습니다.');
            localStorage.setItem('nick_name', req_data.nick_name);
            window.location.href='/work/list';
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });
}

//로그아웃
export const memberLogout = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('nick_name');
    window.location.href='/member/login';
}