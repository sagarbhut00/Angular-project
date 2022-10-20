import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginformComponent } from './forms/loginform/loginform.component';
import { RegisterformComponent } from './forms/registerform/registerform.component';
import { PasswordCheackDirective } from './passwordCheack.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    AddupdateComponent,
    LoginformComponent,
    RegisterformComponent,
    PasswordCheackDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
