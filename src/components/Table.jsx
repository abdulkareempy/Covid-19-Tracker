import React from 'react'

function Table({SNo,country,newCases,active,recovered,deaths}) {
    return (
        <tr>
            <td className="serialColumn">{SNo}</td>
            <td>{country}</td>
            <td>{newCases}</td>
            <td>{active}</td>
            <td>{recovered}</td>
            <td>{deaths}</td>
            
        </tr>
    )
}

export default Table
