import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {AccountService} from '../shared/account.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Product} from '../shared/product.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  myControl = new FormControl();
  products: Product[] = [
    new Product(1, 'name1', 'descr1', 1, new Uint8Array([10, 257])),
    new Product(2, 'name2', 'descr2', 1, new Uint8Array([10, 257])),
    new Product(3, 'name3', 'descr3', 1, new Uint8Array([10, 257])),
    new Product(4, 'name4', 'descr4', 1, new Uint8Array([10, 257])),
    new Product(5, 'name5', 'descr5', 1, new Uint8Array([10, 257])),
    new Product(6, 'name6', 'descr6', 1, new Uint8Array([10, 257]))
  ];
  filteredOptions: Observable<Product[]>;
  user: User;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  }

  logout() {
    this.accountService.logout();
    this.ngOnInit();
  }
}
