import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginauthGuard } from './auth/loginauth.guard';
import { LoginformComponent } from './auth/loginform/loginform.component';
import { RegisterformComponent } from './auth/registerform/registerform.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    canActivate: [LoginauthGuard],
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
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)

  },
  {
    path: 'register',
    title: 'Register',
    canActivate: [LoginauthGuard],
    component: RegisterformComponent
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
