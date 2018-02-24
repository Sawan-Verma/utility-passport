import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public switchSupplier;
  public count = 1;
  public allTransactions = [];
  public addUtilityForm : FormGroup;
  public switchUtilityForm : FormGroup;
  public allUtility = [];
  public utilityData;
  public uniquePassportId;
  public firstName;
  public lastName;
  public age;
  consumerData;
  public phoneNumber;
  private errorMessage;
  private systemTransactions = [];
  private performedTransactions = [];
  constructor(private httpService: UtilityService,
    private sharedService:SharedService,
    private router:Router,
) {
    }

  ngOnInit() {
    this.consumerData =  this.sharedService.getconsmer();
    this.getAllTransactions();
    this.getAllUtility();
    this.createForm();
    this.createSwitchForm();
    if(this.sharedService.getdata()){
      this.uniquePassportId = this.sharedService.getdata()
    }else{
      this.router.navigate(['']);  
    }
    this.loadConsumerData(this.uniquePassportId);
  }
  createForm(){
    this.addUtilityForm = new FormGroup({
      "utilityType": new FormControl(''),
      "startDate": new FormControl(''),
      "endDate": new FormControl(''),
      "supplier": new FormControl(''),
    })
  }

  createSwitchForm(){
    this.switchUtilityForm = new FormGroup({
      "newSupplier" : new FormControl('')
    })
  }
  utilityDetails(event){
    this.utilityData = event;
    console.log(event);
  }
  getAllTransactions(){
    this.count = 0;
    let tempList = [];
    let systemList = [];
    let performedList = [];
    this.httpService.get("http://localhost:3000/api/system/historian")
    .subscribe((res: any) => {
      res = this.sortByKey(res, 'transactionTimestamp');
      this.errorMessage = null;
      res.forEach(transaction => {
        tempList.push(transaction);

        var importClass = transaction["$class"];
        var importClassArray = importClass.split(".");

        if(importClassArray[1] == 'hyperledger'){
          systemList.push(transaction);
        }
        else {
          performedList.push(transaction);
        }
      });
      this.systemTransactions = systemList
      this.performedTransactions = performedList;
      this.allTransactions = tempList;
    debugger;
      
      console.log(this.allTransactions);
    },
      error =>{
        if(error == 'Server error'){
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      }
      else if(error == '404 - Not Found'){
      this.errorMessage = "404 - Could not find API route. Please check your available APIs."
      }
      else{
          this.errorMessage = error;
      }
  });
  }
  getAllUtility(){
    this.httpService.get("http://localhost:3000/api/UtilityDetail")
    .subscribe((res: any) =>{
      const data = res;
      data.forEach(element => {
        if(element.propertyId ===  this.consumerData.propertyId)
        this.allUtility.push(element);
      });
     });
  }
  counter(){
    if(this.count <= this.allTransactions.length)
    {
      this.count++;
    }
    return this.count;
  }
  showDate(x){
    const date = new Date(x);
    return date.getDate() + '-' +(date.getMonth()+1) + '-' + date.getFullYear() + ',' + date.getHours() + ':' + date.getMinutes();
  }
  showTransactionType(txn: string){
    const type = txn.split('.');
    return type[type.length-1];
  }
  //sort the objects on key
  sortByKey(array, key): Object[] {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
 loadConsumerData(id){
   const url = 'http://localhost:3000/api/Consumer/'+id
  this.httpService.get(url)
  .toPromise()
  .then((res:any) => { 
    this.sharedService.setconsumer(res);
      this.firstName= res.firstName;
      this.lastName= res.lastName;
      this.age= res.age;
      this.phoneNumber=res.phoneNumber;
  });
 }

 public switchSupplierToNewSupp(): Promise<any> {
   const supplierform = this.switchUtilityForm.value;
  this.switchSupplier = {
        $class: "org.capita.SwitchSupplier",
        "UD": "org.capita.UtilityDetail#" + this.utilityData.utilityUniqueId,
        "newSupplier": "org.capita.Supplier#" + supplierform.newSupplier
  }; 
  return this.httpService.create('http://localhost:3000/api/SwitchSupplier',this.switchSupplier )
  .toPromise()
  .then(() => { 
    this.getAllUtility();
   });   
}

 public createUtility(data){

  const formdata = data.value;
   const payload =  {
    $class: "org.capita.UtilityDetail",
    "utilityUniqueId": 'UID' + Math.floor((Math.random() * 100) + 1),
    "utilityType": formdata.utilityType,
    "propertyId": this.consumerData.propertyId,
    "supplierId":  formdata.supplier,
    "endDate": formdata.endDate,
    "startDate": formdata.startDate,
    "supplier": formdata.supplier
  };
  return this.httpService.create('http://localhost:3000/api/UtilityDetail',payload )
  .toPromise()
  .then(() => { 
   this.getAllUtility();
   });

 }
}
