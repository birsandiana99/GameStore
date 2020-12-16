import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProductService} from "../shared/product.service";
import {User} from "../shared/user.model";
import {Product} from "../shared/product.model";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class WishlistComponent implements OnInit {

  //dataSource = ELEMENT_DATA;
  expandedElement: Product[];
  products: Product[] = [
    new Product(1, 'name1', 'descr1', 1, new Uint8Array([10, 257])),
    new Product(2, 'name2', 'descr2', 1, new Uint8Array([10, 257])),
    new Product(3, 'name3', 'descr3', 1, new Uint8Array([10, 257])),
    new Product(4, 'name4', 'descr4', 1, new Uint8Array([10, 257])),
    new Product(5, 'name5', 'descr5', 1, new Uint8Array([10, 257])),
    new Product(6, 'name6', 'descr6', 1, new Uint8Array([10, 257]))
  ];
  user: User;
  dataSource: MatTableDataSource<any>;

  // user: User = JSON.parse(sessionStorage.getItem('user'));
  // // @ts-ignore
  // dataSource = new MatTableDataSource(this.productService.getCartProductsForUser(this.user).subscribe(products => this.dataSource.data = products));
  //columnsToDisplay = ['name', 'quantity', 'price'];
  columnsToDisplay = ['name', 'price'];


  constructor(private productService:ProductService,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    // @ts-ignore
    this.dataSource = this.products;
    // this.productService.getCartProductsForUser(JSON.parse(sessionStorage.getItem('user')))
    //   .subscribe(products => this.expandedElement = products)
  }

  removeRow(elm) {
    //this.dataSource = this.dataSource.filter(i => i !== elm);
    this.productService.deleteProductFromCart(elm, this.user.id).subscribe();
    this.refresh();
  }

  addToCart(elm) { //TODO
    //this.dataSource = this.dataSource.filter(i => i !== elm);
    // this.productService.deleteProductFromCart(elm, this.user.id).subscribe();
    // this.refresh();
  }

  refresh() {
    this.productService.getCartProductsForUser(this.user).subscribe(products => this.dataSource.data = products);
  }
}

export interface PeriodicElement {
  name: string;
  quantity: number;
  price: number;
  description: string;
  image: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: "Dark Souls 3",
    quantity: 3,
    price: 100,
    image: "test",
    description: `Producatorii - studioul japonez FromSoftware, condus de catre Hidetaka Miyazaki - continua sa
    redefineasca genul prin DARK SOULS III, cel mai nou joc al seriei create de Hidetaka Miyazaki, a primit o data
    de lansare oficiala.`
  }, {
    name: "Prince of Persia: The Sands of Time Remake",
    quantity: 1,
    price: 200,
    image: "test2",
    description: `Faimosul joc Prince of Persia s-a intors! Imbarcati-va intr-o calatorie ca print
      pentru a va salva regatul de vizorul perfid, in acest clasic complet refacut.`
  },
];
