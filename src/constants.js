let faker=require('faker');
import m from 'moment'

const Settings={
    logo:'https://abb-bank.az/img/logo.svg?v=66',
    employeeList:[],
    employeeCount:58,
}

const generateEmployees=(count)=>{
    for(let i=0; i <count; i++){
        Settings.employeeList.push({
            id:faker.random.number(),
            name:faker.name.firstName(),
            surname:faker.name.lastName(),
            birthDate:m(faker.date.between('1950-01-01', '2015-12-31')).format('DD.MM.YYYY'),
            position:faker.name.jobTitle(),
            phone:faker.phone.phoneNumber('+(994)5#-#######'),
            deleted:false,
            updated:false,
            edit:false,
        });
    }

    localStorage.setItem('original',JSON.stringify(Settings.employeeList));
    localStorage.setItem('employeeList',JSON.stringify(Settings.employeeList));
}

const checkIfEmployeeExists=()=>{
    let employeeList=localStorage.getItem('employeeList');
    if(employeeList){
        Settings.employeeList=JSON.parse(employeeList);
    }else{
        generateEmployees(Settings.employeeCount);
    }
}

checkIfEmployeeExists();

export default Settings;