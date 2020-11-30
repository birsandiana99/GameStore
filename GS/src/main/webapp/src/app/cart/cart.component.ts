import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";


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

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'quantity', 'price'];
  expandedElement: PeriodicElement | null;

  constructor() { }

  ngOnInit(): void {
  }

  removeRow(elm) {
    this.dataSource = this.dataSource.filter(i => i !== elm);
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
