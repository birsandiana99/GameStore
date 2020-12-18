import {Component, NgModule, OnInit, Output} from '@angular/core';
import {MenuComponent} from '../menu/menu.component';
import {ProductCardComponent} from '../product-card/product-card.component';
import {Product} from '../shared/product.model';
import {ProductService} from '../shared/product.service';
import {Observable} from 'rxjs';
import {User} from "../shared/user.model";

// @NgModule({
//   declarations: [
//     ProductCardComponent
//   ]
// })

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  /*products: Product[] = [
    new Product(1, 'name1', 'descr1', 1, new Uint8Array([10, 257])),
    new Product(2, 'name2', 'descr2', 1, new Uint8Array([10, 257])),
    new Product(3, 'name3', 'descr3', 1, new Uint8Array([10, 257])),
    new Product(4, 'name4', 'descr4', 1, new Uint8Array([10, 257])),
    new Product(5, 'name5', 'descr5', 1, new Uint8Array([10, 257])),
    new Product(6, 'name6', 'descr6', 1, new Uint8Array([10, 257])),
    new Product(7, 'name7', 'desc7', 1, new Uint8Array([10, 257]))
  ];*/
  // products.foreach()
  products: Product[];
  user: User;
  testadmin1: boolean;

  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.testadmin();
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  testadmin() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null)
      this.testadmin1 = false;
    else
      this.testadmin1 = this.user.isAdmin;
  }
}
