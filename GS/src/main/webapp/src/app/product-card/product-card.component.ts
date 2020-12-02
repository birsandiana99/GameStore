import {Component, Input, OnInit} from '@angular/core';
import {User} from '../shared/user.model';
import { Product } from '../shared/product.model';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Cart} from "../shared/cart.model";
import {ProductService} from "../shared/product.service";

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
  // product: Product;
  user: User;
  @Input()
  product: Product;
  cart: Cart;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    // this.product = new Product(1, 'name1', 'descr1', 1, new Uint8Array([10, 257]));
  }

  // The current state of the button text
  buttonTextState = 'shown';
  // The text currently being show
  buttonText = "ADD TO CART";
  // The text that will be shown when the transition is finished
  transitionButtonText = "ADD TO CART";


  /**
   * Respond to the transition event of the button text
   * by setting the text awaiting transition then setting the state as shown
   */
  buttonTextTransitioned(event) {
    this.buttonText = this.transitionButtonText;
    this.buttonTextState = this.buttonTextState = 'shown';
  }

  onAddToCart() {
    // Kick off the first transition
    this.buttonTextState = 'transitioning';
    this.transitionButtonText = 'ADDING...';

    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.cart = new Cart(this.user.id, this.user, this.product);
    console.log(this.cart);
    this.productService.addProductToCart(this.cart).subscribe();

    // Do whatever logic here. If it is asynchronous, put the remaining code in your subscribe/then callbacks
    // Note if your logic is snappy, you could leave the timeouts in to simulate the animation for a better UX

    setTimeout(() => {
      this.buttonTextState = 'transitioning';
      this.transitionButtonText = 'ADDED';
    }, 1800);

    // Reset button text
    setTimeout(() => {
      this.buttonTextState = 'transitioning';
      this.transitionButtonText = 'ADD TO CART';
    }, 3600);
  }
}
