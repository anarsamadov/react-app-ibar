import React, { Fragment } from 'react'

const Pagination = ({
                        currentPage,
                        disablePrev,
                        disableNext,
                        prevPage,
                        nextPage,
                        totalPages,
                        toPage
                    }) =>{

    // set page number in parent component
    const setPageNumber=(e)=>{
        toPage(Number(e.target.id));
    }

    // generate pages in pagination bar
    const pages=()=>{
        let row=[];
        for(let i=1;i<=totalPages;i++){
            row.push(<li key={i} className={`page-item ${currentPage===i && 'active'}`}><button className="page-link" id={i} onClick={setPageNumber}>{i}</button></li>);
        }
        return row;
    }

    return (
        <Fragment>
            <div className="col-md-6">
                <div className="float-right">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${disablePrev && 'disabled'}`}><button className="page-link" onClick={prevPage}>Previous</button></li>
                            {pages()}
                            <li className={`page-item ${disableNext && 'disabled'}`}><button className="page-link" onClick={nextPage}>Next</button></li>
                        </ul>
                </nav>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Pagination
