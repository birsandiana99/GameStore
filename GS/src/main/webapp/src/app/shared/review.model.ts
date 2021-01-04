import {User} from "./user.model";
import {Product} from "./product.model";

export class Review {
  id: number;
  user: User;
  product: Product;
  text: String;


  constructor(id: number, user: User, product: Product, text: String) {
    this.id = id;
    this.user = user;
    this.product = product;
    this.text = text;
  }
}
