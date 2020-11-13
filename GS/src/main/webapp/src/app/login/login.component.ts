import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AccountService} from '../shared/account.service';
import {User} from '../shared/user.model';
import {Router} from '@angular/router';
import {MenuComponent} from '../menu/menu.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User;

  constructor(private accountService: AccountService,
              private router: Router,
              private menuComponent: MenuComponent) { }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.login(this.username.value, this.password.value);
  }

  login(username: string, password: string): void {
    console.log(username);
    this.accountService.login(username, password)
      .subscribe(result => {
        this.user = result;
        if (this.user === null){
          alert('Invalid username or password!');
        }
        this.menuComponent.ngOnInit();
        this.router.navigate(['']);

      });
  }
}
