import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddupdateComponent } from './addupdate/addupdate.component';
import { LoginformComponent } from './forms/loginform/loginform.component';
import { RegisterformComponent } from './forms/registerform/registerform.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginformComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'users',
    title: 'Users',
    component: UsersComponent
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterformComponent
  },
  {
    path: 'users/add',
    title: 'Add User',
    component: AddupdateComponent
  },
  {
    path: 'users/edit/:id',
    title: 'Edit User',
    component: AddupdateComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
