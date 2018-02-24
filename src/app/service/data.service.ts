import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Observable';

@Injectable()
export class DataService {

  baseUrl = "http://localhost:3000/api/";

  constructor(private http: Http) { }

  get(url) : Observable<[any]>{
    url = this.baseUrl+url;
    return this.http.get(url)
    .map(this.extractData)
  }
  create(url, payload): Observable<any[]>{
    url = this.baseUrl+url;
    return this.http.post(url,payload)
    .map(this.extractData)
  }
  update(url,payload): Observable<any[]>{
    url = this.baseUrl+url;
    return this.http.put(url, payload)
    .map(this.extractData)
  }
  private extractData(res : any){
    const data = JSON.parse(res['_body']);
    return data || [];
  }

}
