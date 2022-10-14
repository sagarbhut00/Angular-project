import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ChangetextDirective } from './changetext.directive';
import { SqrtPipe } from './app.sqrt';
import { AdDirective } from './advertice/ad.directive';
import { AdverticeComponent } from './advertice/advertice.component';
import { MobileAdComponent } from './advertice/mobile-ad.component';
import { AdBannerComponent } from './advertice/ad-banner.component'
import { NewComComponent } from './new-com/new-com.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { CustomElementComponent } from './custom-element/custom-element.component';
import { createCustomElement } from '@angular/elements';
import { AngularEleComponent } from './angular-ele/angular-ele.component';
import { StyleBindingComponent } from './style-binding/style-binding.component';
import { ChildTwoBComponent } from './child-two-b/child-two-b.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeExComponent } from './pipe-ex/pipe-ex.component';
import { KnowYearPipe } from './know-year.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SvgExComponent } from './svg-ex/svg-ex.component';
import { ConditionalDirComponent } from './conditional-dir/conditional-dir.component';
import { TextStyleDirective } from './text-style.directive';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormComponent } from './form/form.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { PasswordCheackDirective } from './form/passwordCheack.directive';
import { PostsComponent } from './posts/posts.component';
import { SubjectComponent } from './subject/subject.component';
import { Comp1Component } from './comps/comp1/comp1.component';
import { Comp2Component } from './comps/comp2/comp2.component';
import { Comp3Component } from './comps/comp3/comp3.component';
import { LocalstorageComponent } from './localstorage/localstorage.component';



@NgModule({
  declarations: [
    AppComponent,
    NewComComponent,
    NavigationComponent,
    ChangetextDirective,
    SqrtPipe,
    AdDirective,
    AdverticeComponent,
    AdBannerComponent,
    MobileAdComponent,
    ChildComponent,
    ParentComponent,
    CustomElementComponent,
    AngularEleComponent,
    StyleBindingComponent,
    ChildTwoBComponent,
    PipeExComponent,
    KnowYearPipe,
    SvgExComponent,
    ConditionalDirComponent,
    TextStyleDirective,
    PagenotfoundComponent,
    FormComponent,
    RegisterformComponent,
    PasswordCheackDirective,
    PostsComponent,
    SubjectComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,
    LocalstorageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers : [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { 
  constructor(private injector : Injector){
    const el = createCustomElement(CustomElementComponent,{injector});
    customElements.define("custom-ele",el);
    console.log("App Module Load")
  }
}
