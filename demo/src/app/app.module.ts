import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { CustomElementComponent } from './custom-element/custom-element.component';
import  { Injector} from '@angular/core';
import  { createCustomElement } from '@angular/elements';
import { AbcComponent } from './abc/abc.component';

@NgModule({
  imports: [ BrowserModule],
  providers: [],
  declarations: [
    AppComponent,
    CustomElementComponent,
    AbcComponent
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { 

  constructor(private injector: Injector){
    const PopupElement = createCustomElement(CustomElementComponent, {injector});
    customElements.define('popup-element', PopupElement);
}
  }
 
