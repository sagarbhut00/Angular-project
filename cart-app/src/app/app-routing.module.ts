import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NewComComponent } from './new-com/new-com.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AdverticeComponent } from './advertice/advertice.component';
import { ParentComponent } from './parent/parent.component';
import { AngularEleComponent } from './angular-ele/angular-ele.component';
import { StyleBindingComponent } from './style-binding/style-binding.component';
import { PipeExComponent } from './pipe-ex/pipe-ex.component';
import { SvgExComponent } from './svg-ex/svg-ex.component';
import { ConditionalDirComponent } from './conditional-dir/conditional-dir.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CustomPreloadingService } from './custom-preloading.service';
import { RegisterformComponent } from './registerform/registerform.component';
import { PostsComponent } from './posts/posts.component';
import { SubjectComponent } from './subject/subject.component';
import { LocalstorageComponent } from './localstorage/localstorage.component';

const route: Routes = [
  {
    path: '',
    redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'about',
    title: 'About',
    component: NewComComponent
  },
  {
    path: 'home',
    title: 'Home',
    component: NavigationComponent
  },
  {
    path: 'advertice',
    title: 'Advertice',
    component: AdverticeComponent
  },
  {
    path: 'parent',
    title: 'Parent',
    component: ParentComponent
  },
  {
    path: 'custom',
    title: 'Custom',
    component: AngularEleComponent
  },
  {
    path: 'style-bind',
    title: 'Style Bind',
    component: StyleBindingComponent
  },
  {
    path: 'pipe-ex',
    title: 'Pipe',
    component: PipeExComponent
  },
  {
    path: 'svg-ex',
    title: 'Svg',
    component: SvgExComponent
  },
  {
    path: 'cond-dir',
    title: 'Directive',
    component: ConditionalDirComponent
  },
  {
    path: 'route',
    data: { preload: true },
    loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule)
  },
  {
    path: 'posts',
    title: 'Posts',
    component: PostsComponent
  },
  {
    path: 'subject',
    title: 'Subject',
    component: SubjectComponent
  },
  {
    path: 'localstorage',
    title: 'LocalData',
    component: LocalstorageComponent
  },
  {
    path: 'login',
    title: 'Login',
    // data : {preload : true},
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterformComponent
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: PagenotfoundComponent
  }

]
@NgModule({
  imports: [RouterModule.forRoot(route, {
    preloadingStrategy: CustomPreloadingService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
