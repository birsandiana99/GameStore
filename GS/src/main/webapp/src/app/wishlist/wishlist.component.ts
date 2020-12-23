import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ProductService} from '../shared/product.service';
import {User} from '../shared/user.model';
import {Product} from '../shared/product.model';
import {MatTableDataSource} from '@angular/material/table';
import {Cart} from "../shared/cart.model";


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class WishlistComponent implements OnInit {
  expandedElement: Product[];
  test: Product[] = [];
  cart: Cart;
  products: Product[];
  user: User;
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['name', 'price'];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.dataSource = new MatTableDataSource<Product>();
    this.productService.getWishlistForUser(this.user).subscribe(products => this.dataSource.data = products);
  }

  removeRow(elm) {
    this.productService.deleteProductFromWishlist(elm, this.user.id).subscribe();
    this.refresh();
  }

  addToCart(elm){
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.test.indexOf(elm) > -1) {
      console.log('E DEJA IN CART');
    }
    else{
      this.cart = new Cart(0, this.user, elm);
      this.productService.addProductToCart(this.cart).subscribe();
    }
    this.removeRow(elm);
    this.test.push(elm);
  }

  refresh() {
    window.location.reload();
  }
}
