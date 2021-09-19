import React from 'react'

function CasesBox({name,size,total}) {
    return (
        <div>
            <h1>{name}</h1>
            <h3>{size} </h3>
            <h5>{total} </h5>
        </div>
    )
}

export default CasesBox
