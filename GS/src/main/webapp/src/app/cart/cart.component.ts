import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ProductService} from "../shared/product.service";
import {User} from "../shared/user.model";
import {Product} from "../shared/product.model";
import {MatTableDataSource} from "@angular/material/table";


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

  //dataSource = ELEMENT_DATA;
  expandedElement: Product[];
  lista: Product[];
  user: User;
  dataSource: MatTableDataSource<any>;
  // user: User = JSON.parse(sessionStorage.getItem('user'));
  // // @ts-ignore
  // dataSource = new MatTableDataSource(this.productService.getCartProductsForUser(this.user).subscribe(products => this.dataSource.data = products));
  columnsToDisplay = ['name', 'quantity', 'price'];


  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.productService.getCartProductsForUser(this.user).subscribe(products => this.dataSource.data = products));
    // this.productService.getCartProductsForUser(JSON.parse(sessionStorage.getItem('user')))
    //   .subscribe(products => this.expandedElement = products)
  }

  removeRow(elm) {
    //this.dataSource = this.dataSource.filter(i => i !== elm);
    this.productService.deleteProductFromCart(elm, this.user.id).subscribe();
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
