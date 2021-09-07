import React from "react"
const Reset = ({resetTable}) => {
    return (
        <>
            <div className="col-md-2">
                <button className="btn btn-danger" type="submit" onClick={resetTable}>RESET</button>
            </div>
        </>
    )
}

export default Reset