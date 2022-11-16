import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { MatModule } from 'src/app/appModules/mat.module';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatModule
  ]
})
export class MainModule { }
