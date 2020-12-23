import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {LoginComponent} from './login/login.component';
import {SearchComponent} from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import {AddDialogElements, MainPageComponent} from './main-page/main-page.component';
import {AccountService} from './shared/account.service';
import {HttpClientModule} from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProductCardComponent } from './product-card/product-card.component';
import {MatCardModule} from '@angular/material/card';
import {EditDialogElements, ProductDetailsComponent} from './product-details/product-details.component';
import {MatListModule} from '@angular/material/list';
import {ProductService} from './shared/product.service';
import { CartComponent } from './cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import { WishlistComponent } from './wishlist/wishlist.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    MainPageComponent,
    SearchComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    CartComponent,
    WishlistComponent,
    EditDialogElements,
    AddDialogElements
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [AccountService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
