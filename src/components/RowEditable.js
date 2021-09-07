import React, { Component, useState } from 'react'
import m from 'moment';

const RowEditable = ({person,updatePerson,cancelUpdatePerson})=>{

    const [personValue,setPersonValue]=useState(person);
    const personNewData={};

    const updatedPersonValue=(key,value)=>{
        personNewData[key]=value;
    }

    const updateData=(person)=>{
        let error='';
        Object.keys(personNewData).forEach((key,index)=>{
            if(key==='birthDate' && !personNewData[key].match(/^(\d{2})\.(\d{2})\.(\d{4})$/)){
                error='Birthday format must be like DD.MM.YYYY';
                return false;
            }else if(key==='phone' && !personNewData[key].match(/^[\+]?[(]?[+0-9]{3}[)][-\s\.]?[0-9]{2}[-\s\.]?[0-9]{7}$/im)){
                error='Phone format must be like +(994)5#-#######';
                return false;
            }
        });

        if(error){
            alert(error);
        }else{
            Object.assign(person,personNewData);
            updatePerson(person);
        }
    }

    return (
        <tr className={person.deleted ? 'table-danger' : ''}>
            <td>{person.id}</td>
            <td><input type="text" className="form-control input-sm" defaultValue={personValue.name} onChange={(e)=>{updatedPersonValue('name',e.target.value)}}/></td>
            <td><input type="text" className="form-control input-sm" defaultValue={personValue.surname} onChange={(e)=>{updatedPersonValue('surname',e.target.value)}}/></td>
            <td><input type="text" className="form-control input-sm" defaultValue={personValue.birthDate} onChange={(e)=>{updatedPersonValue('birthDate',e.target.value)}}/></td>
            <td><input type="text" className="form-control input-sm" defaultValue={personValue.position} onChange={(e)=>{updatedPersonValue('position',e.target.value)}}/></td>
            <td><input type="text" className="form-control input-sm" defaultValue={personValue.phone} onChange={(e)=>{updatedPersonValue('phone',e.target.value)}}/></td>
            <td className="text-center">
                <div className="btn-group">
                    <button type="button" className="btn btn-success btn-sm" onClick={()=>{updateData(person)}}><i className="fa fa-save" aria-hidden="true"></i></button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={()=>{cancelUpdatePerson(person)}}><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
            </td>
        </tr>
    )
}

export default RowEditable
