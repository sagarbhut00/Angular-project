import { Component, Input } from '@angular/core';
import { AdComponent } from './ad.component';

@Component({
  template: `
  <div class="job-ad">
    <h4>{{data.name}}</h4>
    {{data.dis}}<br>
    <a href="https://www.apple.com/in/?afid=p238%7CsdUuvv563-dc_mtid_187079nc38483_pcrid_620345448420_pgrid_109516736379_pntwk_g_pchan__pexid__&cid=aos-IN-kwgo-brand--slid---product-" class="text-danger mt-3">View More</a>
  </div>
  
  `,
  styles:[`.job-ad {
    border: 1px solid gray;
    padding: 5px;
    padding-bottom: 20px;
    padding-left: 20px;
    border-radius: 10px;
    background-color: lightblue;
    color: black;
  }`]
})
export class MobileAdComponent implements AdComponent {

  @Input() data: any;
  
}
