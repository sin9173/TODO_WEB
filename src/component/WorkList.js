import React from "react";
import queryString from "query-string";

import style from "../css/WorkList.scss";
import { workList, workModifyContent, workModifyState, workRecent, workRegister } from "../js/Work";
import Header from "./Header";
import Page from "./Page";

class WorkList extends React.Component {

    state = {
        list : [],
        recent : {}
    }

    componentDidMount() {
        this.getData();
    }

    constructor(props) {
        super(props);

        const {search} = window.location;

        const queryObj = queryString.parse(search);

        const {
            page
        } = queryObj;

        if(page) this.state.page = page;
    }

    getData = async () => {
        await workRecent()
        .then((obj) => {
            this.setState({recent : obj})
        })

        const req_data = {
            page : this.state.page
        }

        await workList(req_data)
        .then((obj) => {
            this.setState({
                list : obj.list,
                startPage : obj.startPage,
                endPage : obj.endPage,
                lastPage : obj.lastPage,
                currentPage : obj.currentPage
            })
        });
    }

    render() {
        return <div className="WorkList">
            <Header/>
            <div className="title">최근 할일</div>
            <div>
                <WorkHeader/>   
                {
                    this.state.recent.id?<WorkObject data={this.state.recent}/>:''
                } 
            </div>

            <WorkRegister/>

            <div className="title">TODO 리스트</div>
            <div>
                <WorkHeader/>
                {
                    this.state.list.map((data) => {
                        return <WorkObject key={data.id} page={this.state.currentPage} data={data}/>
                    })
                }
            </div>

            <div className="pageContainer">
                <Page
                    listLink={`${window.location.origin}${window.location.pathname}`}
                    startPage={this.state.startPage}
                    endPage={this.state.endPage}
                    lastPage={this.state.lastPage}
                    currentPage={this.state.currentPage}
                />
            </div>
        </div>
    }
}

class WorkHeader extends React.Component {
    render() {
        return <div className="WorkList workHeader">
            <div className="id">NO</div>
            <div className="content">할일</div>
            <div className="state">상태</div>
            <div className="state_button"></div>
            <div className="state_button"></div>
            <div className="state_button"></div>
            <div className="content_modify"></div>
        </div>
    }
}

class WorkObject extends React.Component {

    state = {
        content : '',
        workState : ''
    }

    componentDidMount() {
        this.setState({
            content : this.props.data.content,
            workState : this.props.data.state
        })
    }

    modifyStateSubmit = async(id, state, page) => {
        const req_data = {
            id : id,
            state : state
        }
        await workModifyState(req_data, page)
        .then((obj) => {
            if(page==1) window.location.href='/work/list';
            if(obj) {
                this.setState({
                    workState : state
                });
            }
        })
    }

    modifySubmit = async(content, page) => {        
        const id = this.props.data.id;
    
        if(!content) {alert("할일을 입력해주세요."); return false;}

        const req_data = {
            id : id,
            content : content
        }

        await workModifyContent(req_data, page)
        .then((obj) => {
            if(page==1) window.location.href='/work/list';
            if(obj) {
                this.setState({
                    content : req_data.content
                })
            }
        })
    }

    content_change = (e) => {
        this.setState({
            content : !e.target.value?'':e.target.value
        })
    }

    render() {
        return <div className="WorkList workObject">
            <div className="id">{this.props.data.id}</div>
            <div className="content"><input type="text" value={this.state.content} onChange={this.content_change}/></div>
            <div className="state">{this.state.workState}</div>
            <div className="state_button"><button onClick={this.modifyStateSubmit.bind(this, this.props.data.id, "할일", this.props.page)}>할일</button></div>
            <div className="state_button"><button onClick={this.modifyStateSubmit.bind(this, this.props.data.id, "진행중", this.props.page)}>진행중</button></div>
            <div className="state_button"><button onClick={this.modifyStateSubmit.bind(this, this.props.data.id, "완료됨", this.props.page)}>완료됨</button></div>
            <div className="content_modify"><button onClick={this.modifySubmit.bind(this, this.state.content, this.props.page)}>내용수정</button></div>
        </div>
    }
}

class WorkRegister extends React.Component {

    reigsterSumit(event) {
        event.preventDefault();

        const t = event.target;
        
        const content = t.content.value;
    
        if(!content) {alert("할일을 입력해주세요."); return false;}

        const req_data = {
            content : content
        }

        workRegister(req_data);
    }

    render() {
        return <div className="WorkList workRegister">
            <form onSubmit={this.reigsterSumit}>
                <div>
                    <div>
                        할일 : 
                    </div>
                    <div>
                        <input type="text" name="content"/>
                    </div>
                    <div>
                        <input type="submit" value="등록"/>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default WorkList;