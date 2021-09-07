import React from "react"


const SubmitBtn = ({getResult}) => {

    return (
        <>
            <div className="col-md-2">
                <button className="btn btn-success" onClick={()=>getResult()}>Submit button</button>
            </div>
        </>
    )
}

export default SubmitBtn