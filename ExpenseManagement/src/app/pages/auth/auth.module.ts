import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/appModules/mat.module';
import { WhiteSpaceDirective } from 'src/app/directives/white-space.directive';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    WhiteSpaceDirective,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
  ]
})
export class AuthModule { }
