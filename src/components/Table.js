import React, { useEffect,useState,Fragment} from 'react'
import Constants from '../constants'
import Pagination from './Pagination';
import Row from './Row'
import Search from './Search';
import Reset from './Reset';
import RowEditable from './RowEditable';
import SubmitBtn from './SubmitBtn';

const Table = ()=> {

    const [employeeList,setEmployeeList] = useState([]);
    const [pageNumber,setPageNumber] = useState(1);
    const [perPage,setPerPage]=useState(10);
    const [disablePrev,setDisablePrev]=useState(true);
    const [disableNext,setDisableNext]=useState(false);
    const [totalPages,setTotalPages]=useState(0);
    const [firstLastIndex,setFirstLastIndex]=useState({first:0,last:perPage});
    const [activeSearch,setActiveSearch]=useState(false);
    const [searchList,setSearchList]=useState([]);

    useEffect(()=>{
        getEmployees();
        setTotalPages(Math.ceil(Constants.employeeList.length/perPage));
    },[]);

    useEffect(()=>{
        let lastIndex=pageNumber*perPage;
        
        if(lastIndex >= Constants.employeeList.length){
            lastIndex=Constants.employeeList.length
            setDisableNext(true);
        }else{
            setDisableNext(false);
        }

        let firstIndex=lastIndex-perPage;
        
        setDisablePrev(!firstIndex>0)

        setFirstLastIndex({first:firstIndex, last:lastIndex});
    },[pageNumber]);

    useEffect(()=>{
        getEmployees();
    },[firstLastIndex,searchList]);

    useEffect(()=>{
        setDisableNext(totalPages===1);
        setDisablePrev(!firstLastIndex.first>0)
    },[totalPages]);

    const getEmployees = (search=null)=>{
        let employeeList=localStorage.getItem('employeeList');
        let paginatedEmployees=[];

        if(searchList.length > 0){
            employeeList=JSON.stringify(searchList);
        }

        if(!employeeList){
            employeeList=Constants.employeeList
        }else{
            employeeList=JSON.parse(employeeList);
        }

        if(search){
            employeeList=employeeList.filter((person)=>{
                if(person.name.includes(search)) {
                    return person
                }else if(person.id==search){
                    return person
                };
            });
            setSearchList(employeeList);
        }

        paginatedEmployees= employeeList.slice(firstLastIndex.first, firstLastIndex.last);

        
        setTotalPages(Math.ceil(employeeList.length/perPage));
        
        setEmployeeList(paginatedEmployees);
    }

    const nextPage = () => {
        setPageNumber(pageNumber+1);
    }

    const prevPage = () => {
        setPageNumber(pageNumber-1);
    }

    const toPage = (number) => {
        setPageNumber(number);
    }

    const editPerson= (person) =>{
        listUpdaterMap('id',person.id,'edit',true);
        getEmployees();
    }

    const updatePerson=(person)=>{
        updatePersonData('id',person.id,person);
        listUpdaterMap('id',person.id,'edit',false);
        checkIfPersonUpdated(person);
        getEmployees();
    }

    const cancelUpdatePerson=(person)=>{
        listUpdaterMap('id',person.id,'edit',false);
        getEmployees();
    }

    const removePerson = (person) =>{
        listUpdaterMap('id',person.id,'deleted',true);
        listUpdaterMap('id',person.id,'updated',false);
        getEmployees();
    }

    const rollBackPerson = (person) =>{
        listUpdaterMap('id',person.id,'deleted',false);
        checkIfPersonUpdated(person);
        getEmployees();
    }

    const searchItem=(key)=>{
        setActiveSearch(true);
        getEmployees(key);
    }

    const clearSearch=(name)=>{
        setActiveSearch(false);
        setSearchList([]);
    }

    const checkIfPersonUpdated=(person)=>{
        let original=localStorage.getItem('original');
        original=JSON.parse(original);

        original.map((originalData)=>{
            delete originalData.edit;
            delete person.edit;
            delete originalData.updated;
            delete person.updated;
            delete originalData.edit;
            delete originalData.deleted;
            delete person.deleted;
            if(originalData.id===person.id){
                if(JSON.stringify(originalData)!==JSON.stringify(person)){
                    listUpdaterMap('id',person.id,'updated',true);
                }else{
                    listUpdaterMap('id',person.id,'updated',false);
                }
            }
        });

        getEmployees();
    }

    const listUpdaterMap = (filterKey,filterParam,stateKey,stateValue)=>{
        let empL=localStorage.getItem('employeeList');
        empL=JSON.parse(empL);

        empL=empL.map((person)=>{
            if(person[filterKey]===filterParam){
                person[stateKey]=stateValue;
            }
            return person;
        });

        localStorage.setItem('employeeList',JSON.stringify(empL));
        
    }

    const updatePersonData = (filterKey,filterParam,newPersonData)=>{
        let empL=localStorage.getItem('employeeList');
        empL=JSON.parse(empL);
        empL=empL.map((person)=>{
            if(person[filterKey]===filterParam){
                person=newPersonData;
            }
            return person;
        });

        localStorage.setItem('employeeList',JSON.stringify(empL));
    }

    const resetTable = ()=>{
        let original=localStorage.getItem('original');
        localStorage.setItem('employeeList',original);
        setPageNumber(1);
        getEmployees();
        let result=document.getElementById('result');
        result.style.display='none';
    }

    const getResult=()=>{
        let empL=localStorage.getItem('employeeList');
        empL=JSON.parse(empL);
        let object={
            updated:[],
            deleted:[]
        }

        empL.map((person)=>{
            if(person.updated){
                object.updated.push(person)
            } 

            if(person.deleted){
                object.deleted.push(person)
            }
        });
        
        let result=document.getElementById('result');
        result.style.display='block';
        result.innerHTML=JSON.stringify(object,true);
    }

    return (
        //IF NO EMPLOYEE SHOW WARNING
        employeeList.length > 0 || activeSearch ? (
            <Fragment>
                <div className="row">
                    <Search searchItem={searchItem} clearSearch={clearSearch}/>
                    <SubmitBtn getResult={getResult}/>
                    <Pagination currentPage={pageNumber} totalPages={totalPages} toPage={toPage} nextPage={nextPage} prevPage={prevPage} disableNext={disableNext} disablePrev={disablePrev}/>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Date of birth</th>
                                <th>Position</th>
                                <th>Phone number</th>
                                {
                                    !activeSearch && 
                                    <th className="text-center">Operations</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employeeList.map((person,index)=>{
                                    if(person.edit){
                                        return <RowEditable
                                                updatePerson={updatePerson}
                                                cancelUpdatePerson={cancelUpdatePerson}
                                                key={index}
                                                person={person}/>;
                                    }else{
                                        return <Row 
                                                activeSearch={activeSearch}
                                                editPerson={editPerson} 
                                                removePerson={removePerson} 
                                                rollBackPerson={rollBackPerson} 
                                                key={index} 
                                                person={person}/>
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-md-6 p-0">
                        <Reset resetTable={resetTable}/>
                    </div>
                    <Pagination currentPage={pageNumber} totalPages={totalPages} toPage={toPage} nextPage={nextPage} prevPage={prevPage} disableNext={disableNext} disablePrev={disablePrev}/>
                </div>
                <div className="bg-light p-5" id="result" style={{display:'none'}}></div>
            </Fragment> 

        ) : (
            <div className="alert alert-warning">no data found</div>
        )
    )
}

export default Table
