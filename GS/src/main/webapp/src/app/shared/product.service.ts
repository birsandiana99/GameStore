import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product} from './product.model';

@Injectable({providedIn: 'root'})
export class ProductService {
  private productUrl = 'http://localhost:8080/product';
  private product: Product[];

  constructor(private router: Router, private http: HttpClient) {
  }

  getProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.productUrl + '/get');
  }

  getProductByID(productID):Observable<Product>
  {
   return this.http.get<Product>(this.productUrl+'/getProductByID?ID='+productID);
  }

}
