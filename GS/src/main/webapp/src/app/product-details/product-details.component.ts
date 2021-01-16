import {Component, Inject, Input, OnInit} from '@angular/core';
import {Product} from '../shared/product.model';
import { ProductService} from "../shared/product.service";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {Wishlist} from "../shared/wishlist.model";
import {User} from "../shared/user.model";
import {Cart} from "../shared/cart.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Review} from "../shared/review.model";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  user: User;
  test: Product[] = [];
  testW: Product[] = [];
  testadmin1: boolean;
  @Input()
  public product:Product;
  wishlist: Wishlist;
  cart: Cart;
  review: string;

  // reviews: String[] = [
  //   "review1", "review1", "review1", "review1", "review1", "review1", "review1", "reviewyjmneumkjukiukiu7ki7 ik97ki97ki7eki7wk i7kmicfe 7lsikcf87mvikmz7xmvi8mv768ivm7adkv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e76vm u8le6mvureviewyjmneumkjukiukiu7ki7 ik97ki97ki7eki7wk i7kmicfe 7lsik pizda ma sii cf87mv ikmz 7xmvi 8mv7 68iv" +
  //   "m7adkv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8v kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd ekv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd ekv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e v kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd ed " +
  //   "kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e kv8ivm76 ku8v 6eku8 zjm7v6ku je8 v76dku8vd e" +
  //   "e76vm u8le6mvu sd6mevku7mlv6k u7v6emlku7v6 kl7u6eu76 ue6u7e6u6u 6eu6iu87 6ik78 ok8u kju7 kjiut ,i u "
  // ];

  reviews: Review[];

  constructor(private productService : ProductService,public route : ActivatedRoute,
              public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.testadmin();
    let idprod = this.route.snapshot.paramMap.get('id')
    this.route.params.subscribe(params => {
    let idprod = convertToParamMap(params).get('id');
    })
    this.productService.getProductByID(idprod).subscribe(data => {
      this.product = data;
    });

    this.productService.getReviewsForProductID(idprod).subscribe(data => {
      this.reviews = data;
    })
  }

  testadmin() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null)
      this.testadmin1 = false;
    else
      this.testadmin1 = this.user.isAdmin;
  }

  addComment() {
    console.log("add review");
    var newReview = new Review(0, this.user, this.product, this.review)
    this.productService.addReview(newReview).subscribe();
    this.review = '';
    this.reviews.push(newReview)
    this.ngOnInit();
    window.location.reload();
  }

  deleteComment(review: Review){
    this.productService.deleteReview(review.id).subscribe();
    this.ngOnInit();
    window.location.reload();
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
      this.productService.addProdToWishlist(this.wishlist).subscribe();
    }

    this.testW.push(this.product);

  }

  onAddToCart() {
    this.user = JSON.parse(sessionStorage.getItem('user'));

    console.log(this.test);
    console.log(this.product);
    console.log(this.test.indexOf(this.product));

    this.cart = new Cart(0, this.user, this.product);
    this.productService.addProductToCart(this.cart).subscribe();

    this.test.push(this.product);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      id: this.product.id
    }
    this.dialog.open(EditDialogElements, dialogConfig);
  }

  deleteProduct(){
    this.productService.deleteProduct(this.product.id).subscribe()
    this.router.navigate(['/main-page']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

@Component({
  selector: 'app-product-details',
  templateUrl: './dialog-elements.html',
})

export class EditDialogElements {

  name: string;
  description:string;
  price:number;
  id:number;

  constructor(private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
    this.name  = data.name;
    this.price = data.price;
    this.id = data.id;
  }
  onUpdate(){
    this.productService.updateProduct(new Product(this.id, this.name, this.description, this.price, null)).subscribe();
    window.location.reload();
  }

}
