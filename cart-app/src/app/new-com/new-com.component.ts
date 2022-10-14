import { Component } from '@angular/core';
import { AdService } from '../advertice/ad.service';
@Component({
  selector: 'app-new-com',
  templateUrl: './new-com.component.html',
  styleUrls: ['./new-com.component.css'],
  providers: [AdService]
})
export class NewComComponent {

  fontSizePx:any = 16;
  constructor(private adservice : AdService) {}

  func(){
    this.fontSizePx = this.fontSizePx + 1;
    this.adservice.func();
  } 
  }

