import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent} from './register/register.component';
import { LoginComponent} from './login/login.component';
import {MainPageComponent} from './main-page/main-page.component';
import {SearchComponent} from './search/search.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CartComponent} from './cart/cart.component';
import {WishlistComponent} from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: 'main-page', component: MainPageComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  { path: 'search', component: SearchComponent},
  { path: 'main-page', component: MainPageComponent},
  { path: 'cart', component: CartComponent},
  { path: 'whishlist', component: WishlistComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
