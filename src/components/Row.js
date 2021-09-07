import React from 'react'

const Row = ({person,removePerson,rollBackPerson,editPerson,activeSearch})=>{

    return (
        <tr className={person.deleted ? 'table-danger' : (person.updated ? 'table-warning' : '')}>
            <td>{person.id}</td>
            <td>{person.name}</td>
            <td>{person.surname}</td>
            <td>{person.birthDate}</td>
            <td>{person.position}</td>
            <td>{person.phone}</td>
            {
                !activeSearch && 
                <td className="text-center">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-warning btn-sm" disabled={person.deleted} onClick={()=>{editPerson(person)}}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                        <button type="button" className="btn btn-danger btn-sm" disabled={person.deleted} onClick={()=>{removePerson(person)}}><i className="fa fa-trash" aria-hidden="true"></i></button>
                        <button type="button" className="btn btn-secondary btn-sm" disabled={!person.deleted} onClick={()=>{rollBackPerson(person)}}><i className="fa fa-undo" aria-hidden="true"></i></button>
                    </div>
                </td>
            }
        </tr>
    )
}

export default Row
