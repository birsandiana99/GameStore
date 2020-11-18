import {Component, Input, OnInit} from '@angular/core';
import {User} from '../shared/user.model';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  // product: Product;
  @Input()
  product: Product;

  constructor() {
  }

  ngOnInit(): void {
    // this.product = new Product(1, 'name1', 'descr1', 1, new Uint8Array([10, 257]));
  }

}
