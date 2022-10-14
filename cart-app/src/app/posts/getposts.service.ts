import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetpostsService {

  apiUrl = 'https://dummyjson.com/posts';
  constructor(private http : HttpClient) { }

  getdetails():Observable<any>{
    return this.http.get(this.apiUrl + '?limit=10');
  }

  pathdetails(data:any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/${data.id}` , data)
  }
}
