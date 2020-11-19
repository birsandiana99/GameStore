import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {AccountService} from '../shared/account.service';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import {Product} from '../shared/product.model';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  myControl = new FormControl();
  products: Product[] = [];
  filteredOptions: Observable<Product[]>;
  user: User;
  constructor(private accountService: AccountService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
    // this.filteredOptions = this.productService.getProducts();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): Product[]{
    const filterValue = value.toLowerCase();
    return this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  }

  logout() {
    this.accountService.logout();
    this.ngOnInit();
  }
}
