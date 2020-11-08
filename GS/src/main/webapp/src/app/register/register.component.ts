import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from "../shared/user.model";
import {AccountService} from "../shared/account.service";
import {Router} from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router) { }
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  dateOfBirth = new FormControl('', [Validators.required]);
  hide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }

  onSubmit(): void {
    let newUser : User = new User(0, this.username.value, this.password.value, this.emailFormControl.value, this.name.value, new Date(this.dateOfBirth.value), false);
    console.log(newUser)
    this.accountService.register(newUser).subscribe();
    this.router.navigate(["/login"]);
  }

}
