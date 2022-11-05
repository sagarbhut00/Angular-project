import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './auth/loginform/loginform.component';
import { RegisterformComponent } from './auth/registerform/registerform.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full" 
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginformComponent,
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterformComponent,
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
