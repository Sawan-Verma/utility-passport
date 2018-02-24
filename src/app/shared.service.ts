import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
public loginData: any;
public consumerData: any;
  constructor() { }
public getdata(){
  return this.loginData? this.loginData :''
}
public setdata(value){
  this.loginData = value;
}
public getconsmer(){
  return this.consumerData? this.consumerData :''
}
public setconsumer(value){
  this.consumerData = value;
}
}
