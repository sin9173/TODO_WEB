import React from 'react';
import { memberLogout } from '../js/Member';

class Header extends React.Component {
    state = {
        isLogin : false
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if(token) this.setState({isLogin : true});
    }

    moveLogin() {
        window.location.href="/member/login";
    }

    moveRegister() {
        window.location.href="/member/register";
    }

    logout() {
        memberLogout();
    }

    moveDelete() {
        window.location.href="/member/delete";
    }

    movePasswordModify() {
        window.location.href="/member/modify/password";
    }

    moveMemberModify() {
        window.location.href="/member/modify/info";
    }

    render() {
        return <div className="Header">
            {
                this.state.isLogin?<div>
                    <span>{localStorage.getItem('nick_name')} </span>
                    <button onClick={this.logout}>로그아웃</button>
                    <button onClick={this.moveMemberModify}>회원정보수정</button>
                    <button onClick={this.movePasswordModify}>비밀번호변경</button>
                    <button onClick={this.moveDelete}>회원탈퇴</button>
                </div>:<div>
                    <button onClick={this.moveLogin}>로그인</button>
                    <button onClick={this.moveRegister}>회원가입</button>
                </div>
            }
        </div>
    }
}

export default Header;