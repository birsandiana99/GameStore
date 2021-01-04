import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product} from './product.model';
import {User} from './user.model';
import {Cart} from './cart.model';
import {Wishlist} from './wishlist.model';
import {Review} from "./review.model";

@Injectable({providedIn: 'root'})
export class ProductService {
  private productUrl = 'http://localhost:8080/product';
  private product: Product[];

  constructor(private router: Router, private http: HttpClient) {
  }

  getProducts(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.productUrl + '/getProducts');
  }

  getProductByID(productID): Observable<Product>
  {
   return this.http.get<Product>(this.productUrl + '/getProductByID?ID=' + productID);
  }

  getCartProductsForUser(user: User): Observable<Product[]>
  {
    return this.http.post<Product[]>(this.productUrl + '/getCartProductsForUser', user);
  }

  addProductToCart(cart: Cart): Observable<Cart>{
    return this.http.post<Cart>(this.productUrl + '/addProductToCart', cart);
  }

  addProdToWishlist(wishlist: Wishlist): Observable<Wishlist> {
    console.log('addProdToWishlist called');
    return this.http.post<Wishlist>(this.productUrl + '/addProdToWishlist', wishlist);
  }

  getWishlistForUser(user: User): Observable<Product[]>
  {
    return this.http.post<Product[]>(this.productUrl + '/getWishlistProductsForUser', user);
  }

  deleteProductFromWishlist(product: Product, userID: number): Observable<Response>
  {
    return this.http.post<Response>(this.productUrl + '/deleteWishlist', [product.id, userID]);
  }

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.productUrl + '/addProduct', product);
  }

  updateProduct(product: Product): Observable<Response>{
    return this.http.post<Response>(this.productUrl + '/updateProduct', product);
  }

  deleteProduct(productID: number): Observable<Response>{
    // console.log(this.productUrl + '/deleteProduct/'+ productID)
    return this.http.delete<Response>(this.productUrl + '/deleteProduct/'+ productID);
  }

  addReview(review: Review): Observable<Review>{
    console.log(review);
    return this.http.post<Review>(this.productUrl + '/addReview', review);
  }

  updateReview(review: Review): Observable<Response>{
    return this.http.post<Response>(this.productUrl + '/updateReview', review);
  }

  deleteReview(reviewID: number): Observable<Response>{
    return this.http.delete<Response>(this.productUrl + '/deleteReview/'+ reviewID);
  }

  getReviewsForProductID(productID): Observable<Review[]>
  {
    return this.http.get<Review[]>(this.productUrl + '/getReviewsForProductID?ID=' + productID);
  }


  deleteProductFromCart(product: Product, userID: number): Observable<Response>{
    return this.http.post<Response>(this.productUrl + '/deleteCart', [product.id, userID]);
  }
}
