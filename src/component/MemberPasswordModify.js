import React from 'react';
import style from "../css/Member.scss";
import { memberPasswordModify } from '../js/Member';
import Header from './Header';

class MemberPasswordModify extends React.Component {

    passwordSubmit(event) {
        event.preventDefault();

        const t = event.target;
        
        const user_pw = t.user_pw.value;
        const new_user_pw = t.new_user_pw.value;

        if(!user_pw) {alert("비밀번호를 입력해주세요."); return false;}
        if(!new_user_pw) {alert("신규 비밀번호를 입력해주세요."); return false;}

        const req_data = {
            user_pw : user_pw,
            new_user_pw : new_user_pw
        }

        memberPasswordModify(req_data);
    }
    render() {
        return <div className="Member">
            <Header/>
            <div className="title">비밀번호 수정</div>
            <form onSubmit={this.passwordSubmit}>
                <div className="inputForm">
                    <div>
                        <div>비밀번호</div>
                        <div><input type="password" name="user_pw"></input></div>
                    </div>
                    <div>
                        <div>변경</div>
                        <div><input type="password" name="new_user_pw"></input></div>
                    </div>
                </div>
                <div>
                    <input type="submit" value="변경"/>
                </div>
            </form>
        </div>
    }
}

export default MemberPasswordModify;