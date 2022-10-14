import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[TextStyle]'
})
export class TextStyleDirective {
  
  @Input() TextStyle : any;

  constructor(private el : ElementRef) {
    
   }

  @HostListener('click') onClick() {
    this.changeStyle(this.TextStyle);
  }

  private changeStyle(font:string){
    console.log(font);
    this.el.nativeElement.style.fontWidth = font;
  }


}
