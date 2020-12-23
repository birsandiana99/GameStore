import {Component, Input, OnInit} from '@angular/core';
import {User} from '../shared/user.model';
import { Product } from '../shared/product.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Cart} from '../shared/cart.model';
import {ProductService} from '../shared/product.service';
import {Router} from '@angular/router';
import {Wishlist} from "../shared/wishlist.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [
    trigger('buttonTextStateTrigger', [
      state('shown', style({
        opacity: 1
      })),
      state('transitioning', style({
        opacity: 0.3
      })),
      transition('shown => transitioning', animate('600ms ease-out')),
      transition('transitioning => shown', animate('600ms ease-in'))
    ])
  ]
})
export class ProductCardComponent implements OnInit {

  constructor(private productService: ProductService,
              private route: Router,
              private _snackBar: MatSnackBar) {
  }
  user: User;
  test: Product[] = [];
  testW: Product[] = [];
  @Input()
  product: Product;
  cart: Cart;
  wishlist: Wishlist;

  // The current state of the button text
  buttonTextState = 'shown';
  // The text currently being show
  buttonText = 'ADD TO CART';
  // The text that will be shown when the transition is finished
  transitionButtonText = 'ADD TO CART';

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  goToDetails() {
    this.route.navigate(['/product-details', this.product.id]);
  }

  addToWishlist() {
    this.wishlist = new Wishlist(0, this.user, this.product);
    this.productService.addProdToWishlist(this.wishlist).subscribe();
    this.testW.push(this.product);
  }

  buttonTextTransitioned(event) {
    this.buttonText = this.transitionButtonText;
    this.buttonTextState = this.buttonTextState = 'shown';
  }

  onAddToCart() {
    // Kick off the first transition
    this.buttonTextState = 'transitioning';
    this.transitionButtonText = 'ADDING...';

    this.cart = new Cart(0, this.user, this.product);
    this.productService.addProductToCart(this.cart).subscribe();

    setTimeout(() => {
      this.buttonTextState = 'transitioning';
      this.transitionButtonText = 'ADDED';
    }, 1800);

    // Reset button text
    setTimeout(() => {
      this.buttonTextState = 'transitioning';
      this.transitionButtonText = 'ADD TO CART';
    }, 3600);

    this.test.push(this.product);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
