import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MemberDelete from '../component/MemberDelete';
import MemberLogin from '../component/MemberLogin';
import MemberModify from '../component/MemberModify';
import MemberPasswordModify from '../component/MemberPasswordModify';
import MemberRegister from '../component/MemberRegister';


class MemberRouter extends React.Component {
    render() {
        return <BrowserRouter basename="/member">
            <Routes>
                <Route path="/register" element={<MemberRegister/>}/>
                <Route path="/login" element={<MemberLogin/>}/>
                <Route path="/delete" element={<MemberDelete/>}/>
                <Route path="/modify/password" element={<MemberPasswordModify/>}/>
                <Route path="/modify/info" element={<MemberModify/>}/>
            </Routes>
        </BrowserRouter>
    }
}

export default MemberRouter;