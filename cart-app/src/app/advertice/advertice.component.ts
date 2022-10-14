import { Component, OnInit } from '@angular/core';
import { AdItem } from './ad-item';
import { AdService } from './ad.service';

@Component({
  selector: 'app-advertice',
  template: `
  <div>
    <app-ad-banner [ads]="ads"></app-ad-banner>
  </div>
  `,
  styleUrls:['./advertice.component.css'],
  providers:[AdService]
})

export class AdverticeComponent implements OnInit {
  ads: AdItem[] = [];

  constructor(public adService: AdService) { }

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
  

}
