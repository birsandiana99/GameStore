import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../shared/product.model';
import { ProductService} from "../shared/product.service";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  @Input()
  public product:Product

  reviews: String[] = [
    "review1", "review1", "review1", "review1", "review1", "review1", "review1", "reviewyjmneumkjukiukiu7ki7 ik97ki97ki7eki7wk i7kmicfe 7lsikcf87mvikmz7xmvi8mv768ivm7adkv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e76vm u8le6mvureviewyjmneumkjukiukiu7ki7 ik97ki97ki7eki7wk i7kmicfe 7lsik pizda ma sii cf87mv ikmz 7xmvi 8mv7 68iv" +
    "m7adkv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8v kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd ekv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd ekv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e v kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd ed " +
    "kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e" +
    "e76vm u8le6mvu sd6mevku7mlv6k u7v6emlku7v6 kl7u6eu76 ue6u7e6u6u 6eu6iu87 6ik78 ok8u kju7 kjiut ,i u "
  ];

  constructor(private productService : ProductService,public route : ActivatedRoute) {

  }

  ngOnInit(): void {
    //this.product = new Product(12,"nume","descriere",12,null)
    let idprod = this.route.snapshot.paramMap.get('id')
    this.route.params.subscribe(params => {
    let idprod = convertToParamMap(params).get('id');
    })
    this.productService.getProductByID(idprod).subscribe(data => {
      this.product = data;
    });


  }

  addComment() {

  }

  addToWishlist() {

  }
}
