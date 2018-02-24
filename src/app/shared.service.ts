import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
public loginData: any;
  constructor() { }
public getdata(){
  return this.loginData? this.loginData :''
}
public setdata(value){
  this.loginData = value;
}
}
