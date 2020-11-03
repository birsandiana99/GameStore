import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    sessionStorage.clear();
    this.ngOnInit();
  }
}
