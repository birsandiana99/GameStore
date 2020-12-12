import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../shared/product.model';
import { ProductService} from "../shared/product.service";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {User} from "../shared/user.model";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  user: User;
  testadmin1: boolean;
  @Input()
  public product:Product

  constructor(private productService : ProductService,public route : ActivatedRoute) {

  }

  ngOnInit(): void {
    this.testadmin();
    //this.product = new Product(12,"nume","descriere",12,null)
    let idprod = this.route.snapshot.paramMap.get('id')
    this.route.params.subscribe(params => {
    let idprod = convertToParamMap(params).get('id');
    })
    this.productService.getProductByID(idprod).subscribe(data => {
      this.product = data;
    });
  }

  testadmin() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null)
      this.testadmin1 = false;
    else
      this.testadmin1 = this.user.isAdmin;
  }
}
