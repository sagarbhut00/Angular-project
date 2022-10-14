import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appChangetext]'
})
export class ChangetextDirective {

  constructor(Element: ElementRef) {
    Element.nativeElement.innerText = "How Are you!!...";
   }

}
