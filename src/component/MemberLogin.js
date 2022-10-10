import React from 'react';
import style from "../css/Member.scss";
import { login } from '../js/Member';
import Header from './Header';

class MemberLogin extends React.Component {

    loginSubmit(event) {
        event.preventDefault();

        const t = event.target;
        
        const user_id = t.user_id.value;
        const user_pw = t.user_pw.value;

        if(!user_id) {alert("아이디를 입력해주세요."); return false;}
        if(!user_pw) {alert("비밀번호를 입력해주세요."); return false;}

        const req_data = {
            user_id : user_id,
            user_pw : user_pw
        }

        login(req_data);
    }
    render() {
        return <div className="Member">
            <Header/>
            <div className="title">로그인</div>
            <form onSubmit={this.loginSubmit}>
                <div className="inputForm">
                    <div>
                        <div>아이디</div>
                        <div><input type="text" name="user_id"></input></div>
                    </div>
                    <div>
                        <div>비밀번호</div>
                        <div><input type="password" name="user_pw"></input></div>
                    </div>
                </div>
                <div>
                    <input type="submit" value="로그인"/>
                </div>
            </form>
        </div>
    }
}

export default MemberLogin;