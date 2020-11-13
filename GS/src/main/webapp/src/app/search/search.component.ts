import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AccountService} from '../shared/account.service';
import {Router} from '@angular/router';
import {MenuComponent} from '../menu/menu.component';
import {Product} from '../shared/product.model';
import {ProductService} from '../shared/product.service';
import {Observable} from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  public products: Observable<Product[]>;
  input: string;

  constructor(private productService: ProductService, private router: Router, private menuComponent: MenuComponent) {}

  search(): void
  {
    this.products = this.productService.getProducts();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.search();
  }
}
