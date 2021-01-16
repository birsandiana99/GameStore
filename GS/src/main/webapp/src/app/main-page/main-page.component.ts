import {Component, NgModule, OnInit, Output} from '@angular/core';
import {MenuComponent} from '../menu/menu.component';
import {ProductCardComponent} from '../product-card/product-card.component';
import {Product} from '../shared/product.model';
import {ProductService} from '../shared/product.service';
import {Observable} from 'rxjs';
import {User} from "../shared/user.model";
import {MatDialog} from "@angular/material/dialog";
import {EditDialogElements} from "../product-details/product-details.component";


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
  products: Product[];
  user: User;
  testadmin1: boolean;

  constructor(private productService: ProductService, private dialog: MatDialog) { }
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


  openDialog() {
    this.dialog.open(AddDialogElements);
  }
}

@Component({
  selector: 'app-main-page',
  templateUrl: './dialog-elements.html',
})

export class AddDialogElements {
  name: string;
  description:string;
  price:number;

  constructor(private productService: ProductService) { }
  onAdd(){
    this.productService.addProduct(new Product(0, this.name, this.description, this.price, null)).subscribe();
  }

}
