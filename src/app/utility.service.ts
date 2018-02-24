/**
* angular dependency
*/
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Observable';
import 'rxjs/add/operator/map'

/**
* @brief This class contains All the methods i.e.
*        get     for fetch the list
*        create  for creating the dataItem
*        update  for updating the dataItem
*        delete  for deleting the dataItem
*      
*
*/

@Injectable()
export class UtilityService {

  constructor(private http: Http) { }

 
  /**
   * @brief      function for getting the list
    * @return     list of data
   */
  get(url: string): Observable<any[]> {
    return this.http.get(url)
      .map(this.extractData)
  }

  /**
   * @brief      function for creating the dataItem
   *
   * @param      {any} url        The requested url
   * @param      {any} payload    contains the payload dataItem
   *
   * @return     created new row data
   */
  create(url, payload): Observable<any[]> {
    return this.http.post(url, payload)
      .map(this.extractData)
  }

  /**
   * @brief      function for updating the existing dataItem
   *
   * @param      {any} url        The requested url
   * @param      {any} payload    contains the payload dataItem
   *
   * @return     modify the existing row data
   */
  update(url, payload): Observable<any[]> {
     return this.http.put(url, payload)
      .map(this.extractData)
  }

  /**
   * @brief      function for deleting the selected dataItem
   *
   * @param      {any} url        The requested url
   * @param      {any} payload    contains the payload dataItem
   *
   * @return     delete the seleted row data
   */
  delete(url, payload): Observable<any[]> {
    return this.http.delete(url, payload.body)
      .map(this.extractData)
  }

 

  /**
    * @brief      Extract a Data i.e response of map and return the data.
    *
    * @param      {any} res   The responce
    *
    * @return     return the data
    */
  private extractData(res: Response) {
    const body = res.json();
    return body || [];
  }

}