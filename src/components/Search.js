import React from "react"
const Search = ({searchItem,clearSearch}) => {

    const onSubmit=(e)=>{
        e.preventDefault();
        searchItem(e.target.elements.searchText.value);
        e.target.elements.searchText.value='';
    }

    return (
        <>
            <div className="col-md-3">
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control" name="searchText" placeholder="ex:76 or Sam"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-md-1">
                <button className="btn btn-primary mr-2" type="submit" onClick={clearSearch}><i className="fa fa-times"></i></button>
            </div>
        </>
    )
}

export default Search