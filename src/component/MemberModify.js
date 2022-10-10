import React from 'react';
import style from "../css/Member.scss";
import { memberInfoModify } from '../js/Member';
import Header from './Header';

class MemberModify extends React.Component {

    modifySubmit(event) {
        event.preventDefault();

        const t = event.target;
        
        const nick_name = t.nick_name.value;

        if(!nick_name) {alert("닉네임을 입력해주세요."); return false;}

        const req_data = {
            nick_name : nick_name
        }

        memberInfoModify(req_data);
    }
    render() {
        return <div className="Member">
            <Header/>
            <div className="title">회원 정보 수정</div>
            <form onSubmit={this.modifySubmit}>
                <div className="inputForm">
                    <div>
                        <div>닉네임</div>
                        <div><input type="text" name="nick_name" defaultValue={localStorage.getItem("nick_name")}></input></div>
                    </div>
                </div>
                <div>
                    <input type="submit" value="수정"/>
                </div>
            </form>
        </div>
    }
}

export default MemberModify;