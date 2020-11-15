import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {AccountService} from '../shared/account.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  user: User;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  logout() {
    this.accountService.logout();
    this.ngOnInit();
  }
}
