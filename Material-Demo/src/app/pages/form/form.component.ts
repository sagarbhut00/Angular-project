import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';
import { BottomsheetComponent } from './bottomsheet/bottomsheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


interface Technology {
  value: string;
  viewValue: string;
}
interface State {
  value: string;
  viewValue: string;
}
interface Skill {
  name: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  technologyList: Technology[] = [
    { value: 'angular', viewValue: 'Angular' },
    { value: 'php', viewValue: 'PHP' },
    { value: 'react', viewValue: 'React' },
    { value: 'android', viewValue: 'Android' }
  ]
  stateList: State[] = [
    { value: 'gujrat', viewValue: 'Gujrat' },
    { value: 'maharastra', viewValue: 'Maharastra' },
  ]

  options: string[] = ['Rajkot', 'Ahmdabad', 'Surat'];
  filteredOptions: Observable<string[]> | undefined;
  todayDate: Date = new Date();
  hide = true;
  isChecked = true;
  addOnBlur = true;
  registerForm: FormBuilder | any;
  loginForm: FormBuilder | any;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Skills: Skill[] = [{name : 'Angular'}];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private _bottomSheet: MatBottomSheet) { }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      weight: [''],
      toggle: [''],
      password: [''],
      email: [''],
      technology: [''],
      date: [''],
      skill: [''],
      hobby: this.fb.group({
        cricket: false,
        games: false,
        songs: false
      }),
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['' ,Validators.required]
    })

    this.filteredOptions = this.registerForm.get('city').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')
      ),
    );
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  register() {
    if (this.registerForm.valid) {
      this.registerForm.value.skill = this.Skills;
      this.snackbar.open('Successfully Saved!!', 'Ok', { duration: 2000 });
      console.log(this.registerForm.value);
    }
  }

  login(){
    console.log(this.loginForm.value);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  myFilterToday = (d: Date | null): boolean => {
    const day = d;
    // Prevent Saturday and Sunday from being selected.
    return day !== new Date();
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomsheetComponent);
  }

  //for Chips...

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.Skills.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: Skill): void {
    const index = this.Skills.indexOf(skill);

    if (index >= 0) {
      this.Skills.splice(index, 1);
    }
  }
}
