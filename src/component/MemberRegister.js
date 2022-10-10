import React from 'react';
import style from "../css/Member.scss";
import { memberRegister } from '../js/Member';
import Header from './Header';

class MemberRegister extends React.Component {

    registerSubmit(event) {
        event.preventDefault();

        const t = event.target;
        
        const user_id = t.user_id.value;
        const user_pw = t.user_pw.value;
        const nick_name = t.nick_name.value;

        if(!user_id) {alert("아이디를 입력해주세요."); return false;}
        if(!user_pw) {alert("비밀번호를 입력해주세요."); return false;}
        if(!nick_name) {alert("닉네임을 입력해주세요."); return false;}

        const req_data = {
            user_id : user_id,
            user_pw : user_pw,
            nick_name : nick_name
        }

        memberRegister(req_data);
    }
    render() {
        return <div className="Member">
            <Header/>
            <div className="title">회원가입</div>
            <form onSubmit={this.registerSubmit}>
                <div className="inputForm">
                    <div>
                        <div>아이디</div>
                        <div><input type="text" name="user_id"></input></div>
                    </div>
                    <div>
                        <div>비밀번호</div>
                        <div><input type="password" name="user_pw"></input></div>
                    </div>
                    <div>
                        <div>닉네임</div>
                        <div><input type="text" name="nick_name"></input></div>
                    </div>
                </div>
                <div>
                    <input type="submit" value="가입"/>
                </div>
            </form>
        </div>
    }
}

export default MemberRegister;