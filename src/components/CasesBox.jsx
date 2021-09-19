import React from 'react'

function CasesBox({name,size,total}) {
    return (
        <div className={name.toLowerCase()}>
            <h2>{name}</h2>
            <h3>{size} </h3>
            <h5>{total} </h5>
        </div>
    )
}

export default CasesBox
