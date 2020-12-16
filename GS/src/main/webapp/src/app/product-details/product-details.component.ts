import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../shared/product.model';
import { ProductService} from '../shared/product.service';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  @Input()
  public product: Product;

  constructor(private productService: ProductService, public route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.product = new Product(12,"nume","descriere",12,null)
    const idprod = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
    const idprod = convertToParamMap(params).get('id');
    });
    this.productService.getProductByID(idprod).subscribe(data => {
      this.product = data;
    });


  }

  addToWishlist() {

  }
}
