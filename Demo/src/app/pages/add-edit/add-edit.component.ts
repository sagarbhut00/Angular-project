import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppserviceService } from 'src/app/service/appservice.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  addForm: FormBuilder | any;
  types: string[] = ['Mobile', 'Electronics', 'HomeAppliances'];
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;
  id: any;
  submit = false;
  imageSizeMsg: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private service: AppserviceService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: [this.data ? this.data.name : '', [Validators.required, Validators.pattern("^[a-zA-z].*")]],
      description: [this.data ? this.data.description : '', [Validators.required, Validators.pattern("^[a-zA-z0-9].*")]],
      type: [this.data ? this.data.type : '', Validators.required],
      amount: [this.data ? this.data.amount : '', [Validators.required, Validators.pattern("^[1-9].*")]],
      image: ['']
    });
    if (this.data) {
      this.imageUrl = this.data.image;
    }
  }

  onSubmit() {
    this.submit = true;
    if (this.addForm.valid && this.imageUrl) {
      let data = this.service.getData();

      if (!this.data) {

        if (Object.keys(data).length === 0) {
          this.id = 1;
        } else {
          this.id = Math.max(...data.map((res: any) => res.id)) + 1;
        }
        this.addForm.value.image = this.imageUrl;
        const obj = this.addForm.value;
        obj.id = this.id;
        data.push(obj);
        this.service.setData(data);
        this.snackbar.open('Add Successfully!!', 'Ok', { duration: 2000 });
      } else {
        this.addForm.value.image = this.imageUrl;
        const objData = this.addForm.value;
        objData.id = this.data.id;
        let arr = data.map((obj: any) => {
          if (obj.id === this.data.id) {
            return objData;
          }
          return obj;
        })
        this.service.setData(arr);
        this.snackbar.open('Upadate Successfully!!', 'Ok', { duration: 2000 });
      }
      this.dialogRef.close();
      this.submit = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadFile(event: any) {
    this.imageSizeMsg = undefined;
    let file = event.target.files[0];
    this.ReadAsBase64(file)
    .then(res => {
      this.imageUrl = res;
    })
    .catch(res => {
      this.imageSizeMsg = res;
    })
  
    //ChangeDetectorRef since file is loading outside the zone
    this.cd.markForCheck();
    
  }


  ReadAsBase64(file:any): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        const result = reader.result as String;
        if (!result) reject('Cannot read variable');
        if (file.size > 2*10**5) reject('File Size should Not exceed 200KB'); // Note: 2*2**20 = 2**21 
        resolve(reader.result);
      });

      reader.addEventListener('error', event => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });

    return fileValue;
  }

  isNumber(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  isText(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;
  }

}
