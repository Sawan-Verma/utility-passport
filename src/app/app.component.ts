import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "app";
  allTransactions = [];
  private errorMessage;
  private systemTransactions = [];
  private performedTransactions = [];
  constructor(private httpService: DataService){

  }
  ngOnInit(){
    this.getAllTransactions();

  }
  getAllTransactions(){
    let tempList = [];
    let systemList = [];
    let performedList = [];
    this.httpService.get("system/historian")
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
  //sort the objects on key
  sortByKey(array, key): Object[] {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
}
