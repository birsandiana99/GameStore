import {User} from './user.model';
import {Product} from './product.model';

export class Wishlist {
  id: number;
  user: User;
  product: Product;

  constructor(id: number, user: User, product: Product) {
    this.id = id;
    this.user = user;
    this.product = product;
  }
}
