import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count = 1;
  allTransactions = [];
  addUtilityForm : FormGroup;
  allUtility = [];
  private errorMessage;
  private systemTransactions = [];
  private performedTransactions = [];
  constructor(private httpService: UtilityService) {
    }

  ngOnInit() {
    this.getAllTransactions();
    this.getAllUtility();
    this.createForm();
  }
  createForm(){
    this.addUtilityForm = new FormGroup({
      "utilityType": new FormControl(''),
      "startDate": new FormControl(''),
      "endDate": new FormControl(''),
      "supplier": new FormControl(''),
    })
  }
  utilityDetails(event){
    debugger;
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
      this.allUtility = res;
      debugger;
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

}
