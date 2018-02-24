import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { UtilityService } from '../utility.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  loginForm :FormGroup;

  firstName = new FormControl("", Validators.required);
  lastName = new FormControl("", Validators.required);      
  age = new FormControl("", Validators.required);      
  phoneNumber = new FormControl("", Validators.required);
  passportUniqueId = new FormControl("");
  propertyId = new FormControl("");

  username = new FormControl("", Validators.required);
  password = new FormControl("");

  myModal = true;
  public passUniqueId;
  private consumer;
  private errorMessage;
 

  constructor(private router:Router, fb: FormBuilder, private utilityService:UtilityService, private sharedService:SharedService ) {
    this.myForm = fb.group({
      firstName:this.firstName,
      lastName:this.lastName,  
      age:this.age,
      phoneNumber:this.phoneNumber,
      passportUniqueId:this.passportUniqueId,
      propertyId:this.propertyId
});
this.loginForm = fb.group({         
  username:this.username,
  password:this.password
});
   }

  ngOnInit() {
  }
public login(loginForm){
const formData =loginForm.value.username;
const UPID = formData.replace('upid', '')
this.sharedService.setdata(UPID);
  this.router.navigate(['dashboard']);
}

createAssetsBank(): Promise<any> {
  this.passUniqueId = "upid" + this.phoneNumber.value,
  this.consumer = {
    $class: "org.capita.Consumer",
        "phoneNumber": this.phoneNumber.value,
        "propertyId":"pid" + this.phoneNumber.value,
        "passportUniqueId":"upid" + this.phoneNumber.value,
        "firstName": this.firstName.value,
        "lastName":this.lastName.value,
        "age":this.age.value,
  }; 
  return this.utilityService.create('http://localhost:3000/api/Consumer',this.consumer )
  .toPromise()
  .then(() => { 
    confirm(`Please make a note of your ${this.passUniqueId}`);
   });   
}

}
