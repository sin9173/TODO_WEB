import React from 'react';

class Page extends React.Component {
    state = {
        searchLink : window.location.search
    }

    move(page) {
        const urlSearch = new URLSearchParams(window.location.search);
        urlSearch.set('page', page);
        
        window.location.href=`${this.props.listLink}?${urlSearch.toString()}`;
    }

    render() {
        const result = [];

        const startPage = this.props.startPage;
        const endPage = this.props.endPage;
        const lastPage = this.props.lastPage;
        const currentPage = this.props.currentPage;

        if(startPage>10) result.push(<li key="<" className="pageObject"><a onClick={this.move.bind(this, (startPage-1))}>{"<"}</a></li>)

        for(let i=startPage ; i<=endPage ; i++) {
            if(i>lastPage) break;
            if(i!=currentPage) result.push(<li key={i} className="pageObject"><a onClick={this.move.bind(this, i)}>{i}</a></li>);
            if(i==currentPage) result.push(<li key={i} className="pageObject"><span className="active">{i}</span></li>);
        }

        if(endPage<lastPage) result.push(<li key="<" className="pageObject"><a onClick={this.move.bind(this, (endPage+1))}>{">"}</a></li>);

        return <div className="pageController">
            <ul className="pages">
                {result}
            </ul>
        </div>
    }
}

export default Page;