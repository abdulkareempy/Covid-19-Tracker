import React from 'react'

function Table({SNo,country,active,recovered,deaths}) {
    return (
        <tr>
            <td>{SNo}</td>
            <td>{country}</td>
            <td>{active}</td>
            <td>{recovered}</td>
            <td>{deaths}</td>
            
        </tr>
    )
}

export default Table
