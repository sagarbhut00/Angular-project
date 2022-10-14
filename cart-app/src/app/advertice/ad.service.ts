import { Injectable } from '@angular/core';
import { AdItem } from './ad-item';
import { MobileAdComponent } from './mobile-ad.component';

@Injectable(
)
export class AdService {

  getAds() {
    return [
      new AdItem(
        MobileAdComponent,
        { name: 'Iphone 14', dis: '$699  Buy Now' }
      ),
      new AdItem(
        MobileAdComponent,
        { name: 'Iphone 14 Pro', dis: '$799  Buy Now' }
      ),
      new AdItem(
        MobileAdComponent,
        { name: 'Iphone 14 Max', dis: '$899 Buy Now' }
      ),
      new AdItem(
        MobileAdComponent,
        { name: 'Iphone 14 Mini', dis: '$599 Buy Now' }
      )
    ];
  }

  func(){
    alert("ad service");
  }
}
