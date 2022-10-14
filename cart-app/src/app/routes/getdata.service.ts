import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private http: HttpClient) { }

  
// data:any = JSON.parse(fetch('https://dummyjson.com/products/1')
//             .then(res => res.json())
//             .then(json => console.log(json)))

func(){
  return this.http.get(`https://jsonplaceholder.typicode.com/users`)
}

fechsingleemp(id:any){
  return this.http.get(`https://jsonplaceholder.typicode.com/users/` + id)
}
}
