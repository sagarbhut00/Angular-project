import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private router: Router) { }


  addProduct(data: FormData) {
    this.http.post(environment.baseApi + 'products', data).subscribe(res => console.log(res))
    this.router.navigate(['dashboard/product']);
  }

}
