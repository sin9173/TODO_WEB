import { apiConnectJson, apiConnectParam } from "./ApiUtils"

//로그인
export const login = async (req_data) => {
    await apiConnectJson('POST', "/member/login", req_data)
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            localStorage.setItem("user_id", obj.user_id);
            localStorage.setItem("nick_name", obj.nick_name);
            localStorage.setItem("todo_login_it", true)
            alert("로그인");
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
    await apiConnectParam(`/member/idcheck/${req_data.user_id}`)
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
    await apiConnectJson('POST', "/member", req_data)
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
    await apiConnectJson('DELETE', "/member", req_data, localStorage.getItem('user_id'))
    .then((obj) => {
        if(obj.result!='00') alert(obj.message)
        else {
            alert('삭제되었습니다.');
            memberLogout();
        }
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });
}

//회원 비밀번호 수정
export const memberPasswordModify = async (req_data) => {
    await apiConnectJson('PUT', "/member/password", req_data, localStorage.getItem('user_id'))
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
    await apiConnectJson('PUT', "/member/info", req_data, localStorage.getItem('user_id'))
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
export const memberLogout = async () => {
    await apiConnectParam("/member/logout")
    .then((obj) => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('nick_name');
        localStorage.removeItem("todo_login_it");
        window.location.href='/member/login';
    })
    .catch((err) => {
        console.log(err);
        alert("에러");
    });
}