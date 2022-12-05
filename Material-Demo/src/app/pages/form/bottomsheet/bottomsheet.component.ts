import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrls: ['./bottomsheet.component.scss']
})
export class BottomsheetComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
