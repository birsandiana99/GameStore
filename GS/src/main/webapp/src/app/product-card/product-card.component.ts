import {Component, Input, OnInit} from '@angular/core';
import {User} from '../shared/user.model';
import { Product } from '../shared/product.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Cart} from '../shared/cart.model';
import {ProductService} from '../shared/product.service';
import {Router} from '@angular/router';
import {Wishlist} from "../shared/wishlist.model";

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
              private route: Router) {
  }
  // product: Product;
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
    // this.product = new Product(1, 'name1', 'descr1', 1, new Uint8Array([10, 257]));
  }

  goToDetails() {
    // window.sessionStorage.setItem("prodID",<string><unknown>this.product.id)
    this.route.navigate(['/product-details', this.product.id]);
  }


  addToWishlist() {
    this.user = JSON.parse(sessionStorage.getItem('user'));


    console.log(this.product);
    if (this.testW.indexOf(this.product) > -1)
    {
      console.log('e deja in cart');
    }
    else
    {
      this.wishlist = new Wishlist(0, this.user, this.product);
      this.productService.addProdToWishlist(this.wishlist);
    }

    this.testW.push(this.product);

  }


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

    console.log(this.test);
    console.log(this.product);
    console.log(this.test.indexOf(this.product));

    if (this.test.indexOf(this.product) > -1) {
      console.log('E DEJA IN CART');
    }
    else{
      this.cart = new Cart(0, this.user, this.product);
      this.productService.addProductToCart(this.cart).subscribe();
    }

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

    this.test.push(this.product);
  }
}
