import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user.model";
import {AccountService} from "../shared/account.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    this.accountService.logout();
    this.ngOnInit();
  }
}
