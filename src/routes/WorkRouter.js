import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import WorkList from "../component/WorkList";


class WorkRouter extends React.Component {
    render() {
        return<BrowserRouter basename="/work">
                <Routes>
                    <Route path="/list" element={<WorkList/>}/>
                </Routes>
            </BrowserRouter>
    }
}

export default WorkRouter;