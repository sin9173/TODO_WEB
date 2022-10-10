import React from 'react'
import style from "../css/Member.scss";
import { memberDelete } from '../js/Member';
import Header from './Header';

class MemberDelete extends React.Component {

    deleteSubmit(event) {
        event.preventDefault();

        const t = event.target;
        
        const user_pw = t.user_pw.value;
    
        if(!user_pw) {alert("비밀번호를 입력해주세요."); return false;}

        const req_data = {
            user_pw : user_pw
        }

        memberDelete(req_data);
    }
    render() {
        return <div className="Member">
            <Header/>
            <div className="title">회원탈퇴</div>
            <form onSubmit={this.deleteSubmit}>
                <div className="inputForm">
                    <div>
                        <div>비밀번호</div>
                        <div><input type="password" name="user_pw"></input></div>
                    </div>
                </div>
                <div>
                    <input type="submit" value="탈퇴"/>
                </div>
            </form>
        </div>
    }
}

export default MemberDelete;