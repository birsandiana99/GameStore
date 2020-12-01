import {Component, Input, OnInit} from '@angular/core';
import {User} from '../shared/user.model';
import { Product } from '../shared/product.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  // product: Product;
  @Input()
  product: Product;

  constructor(private route:Router) {
  }

  ngOnInit(): void {
    // this.product = new Product(1, 'name1', 'descr1', 1, new Uint8Array([10, 257]));
  }

  goToDetails(){
    //window.sessionStorage.setItem("prodID",<string><unknown>this.product.id)
    this.route.navigate(['/product-details',this.product.id]);
  }
}
