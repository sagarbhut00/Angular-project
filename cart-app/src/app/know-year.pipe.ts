import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'knowYear'
})
export class KnowYearPipe implements PipeTransform {

  currentDate = new Date();
  

  transform(value: Date): number {

    value = new Date(value);

    return this.currentDate.getFullYear() - value.getFullYear();
  
  }

}
