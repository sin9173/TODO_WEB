import React from 'react';

class Page extends React.Component {
    state = {
        searchLink : window.location.search
    }

    render() {
        const result = [];
        const listLink = this.props.listLink;

        const startPage = this.props.startPage;
        const endPage = this.props.endPage;
        const lastPage = this.props.lastPage;
        const currentPage = this.props.currentPage;

        if(startPage>10) result.push(<li key="<" className="pageObject"><a href={`${listLink}?page=${startPage-1}${this.state.searchLink.replace(`?page=${currentPage}`, '').replace('?', '&')}`}>{"<"}</a></li>)

        for(let i=startPage ; i<=endPage ; i++) {
            if(i>lastPage) break;
            if(i!=currentPage) result.push(<li key={i} className="pageObject"><a href={`${listLink}?page=${i}${this.state.searchLink.replace(`?page=${currentPage}`, '').replace('?', '&')}`}>{i}</a></li>);
            if(i==currentPage) result.push(<li key={i} className="pageObject"><span className="active">{i}</span></li>);
        }

        if(endPage<lastPage) result.push(<li key="<" className="pageObject"><a href={`${listLink}?page=${endPage+1}${this.state.searchLink.replace(`?page=${currentPage}`, '').replace('?', '&')}`}>{">"}</a></li>);

        return <div className="pageController">
            <ul className="pages">
                {result}
            </ul>
        </div>
    }
}

export default Page;