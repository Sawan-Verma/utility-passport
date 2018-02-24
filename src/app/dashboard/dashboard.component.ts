import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public uniquePassportId;
  public firstName;
  public lastName;
  public age;
  public phoneNumber;

  constructor(private sharedService:SharedService,private router:Router,private utilityService:UtilityService) {
    }

  ngOnInit() {
    if(this.sharedService.getdata()){
      this.uniquePassportId = this.sharedService.getdata()
    }else{
      this.router.navigate(['']);  
    }
    this.loadConsumerData(this.uniquePassportId);
  }
 loadConsumerData(id){
   const url = 'http://localhost:3000/api/Consumer/'+id
  this.utilityService.get(url)
  .toPromise()
  .then((res:any) => { 
      this.firstName= res.firstName;
      this.lastName= res.lastName;
      this.age= res.age;
      this.phoneNumber=res.phoneNumber;
  });
 }
}
