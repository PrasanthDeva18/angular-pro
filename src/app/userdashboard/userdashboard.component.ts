import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {ApiService} from '../shared/api.service';
import { UserModel } from './userdashboard.model';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  formvalue !: FormGroup;
  userModelObj:UserModel =new UserModel();
  userData !:any;
  showAdd!:boolean;
  showUpdate !:boolean;

  constructor(private formbuilder: FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      FirstName : [''],
      LastName : [''],
     Email : [''],
     Mobile : [''],
     Salary : ['']
    })
    this.getALLUser();
  }
  clickAddUser(){
    this.formvalue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postUserDetails()
  {
    this.userModelObj.FirstName=this.formvalue.value.FirstName;
    this.userModelObj.LastName=this.formvalue.value.LastName;
    this.userModelObj.email=this.formvalue.value.Email;
    this.userModelObj.mobile=this.formvalue.value.Mobile;
    this.userModelObj.salary=this.formvalue.value.Salary;

    this.api.postUser(this.userModelObj)
    .subscribe(res=>{
             console.log(res);
             alert("User added successfully");
             let ref = document.getElementById('cancel')
             ref?.click();
             this.formvalue.reset();
             this.getALLUser();
    },
    err=>{
      alert("something wrong");
    })
  }
  getALLUser(){
    this.api.getUser()
    .subscribe(res=>{
        this.userData =res;
    })
  }
  deleteUser(row : any){
    this.api.deleteUser(row.id)
    .subscribe(res=>
      {
        alert("user deleted")
        this.getALLUser();
      })
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.userModelObj.id=row.id;
    this.formvalue.controls['FirstName'].setValue(row.FirstName);
    this.formvalue.controls['LastName'].setValue(row.LastName);
    this.formvalue.controls['Email'].setValue(row.email);
    this.formvalue.controls['Mobile'].setValue(row.mobile);
    this.formvalue.controls['Salary'].setValue(row.salary);
  }
  updateUserDetails(){
    this.userModelObj.FirstName=this.formvalue.value.FirstName;
    this.userModelObj.LastName=this.formvalue.value.LastName;
    this.userModelObj.email=this.formvalue.value.Email;
    this.userModelObj.mobile=this.formvalue.value.Mobile;
    this.userModelObj.salary=this.formvalue.value.Salary;

    this.api.updateUser(this.userModelObj,this.userModelObj.id)
    .subscribe(res=>
      {
        alert("update successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formvalue.reset();
        this.getALLUser()
      })

  }

}
