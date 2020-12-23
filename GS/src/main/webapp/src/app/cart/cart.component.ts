import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ProductService} from '../shared/product.service';
import {User} from '../shared/user.model';
import {Product} from '../shared/product.model';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CartComponent implements OnInit {
  expandedElement: Product[];
  lista: Product[];
  user: User;
  dataSource: MatTableDataSource<Product>;
  columnsToDisplay = ['name', 'price'];


  constructor(private productService: ProductService,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.dataSource = new MatTableDataSource();
    this.productService.getCartProductsForUser(this.user).subscribe(products => this.dataSource.data = products)
    this.productService.getCartProductsForUser(this.user).subscribe(prod => this.lista = prod);
  }

  removeRow(elm) {
    this.productService.deleteProductFromCart(elm, this.user.id).subscribe();
    this.refresh();
  }

  refresh() {
    window.location.reload();
  }

  calculateTotal() {
    return this.lista.reduce((acumm, curr) => acumm + curr.price, 0);
  }
}
