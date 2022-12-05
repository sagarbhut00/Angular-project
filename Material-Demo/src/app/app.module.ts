import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './Mat-Module/mat/mat.module';
import { FormComponent } from './pages/form/form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './pages/form/dialog/dialog.component';
import { BottomsheetComponent } from './pages/form/bottomsheet/bottomsheet.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DashboardComponent,
    DialogComponent,
    BottomsheetComponent,
  ],
  imports: [
    MatModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
