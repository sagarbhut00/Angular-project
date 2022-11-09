import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ProductService } from 'src/app/services/product-service/product.service';
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  addProductForm: FormBuilder | any;
  submit: any;
  fileHolder: File | undefined;

  constructor(public location: Location,
    private fb: FormBuilder,
    private productservice: ProductService) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
    }
  }

  add() {
    this.submit = true;
    if (this.addProductForm.valid && this.fileHolder?.name) {
      const formData = new FormData();
      formData.append('name', this.addProductForm.value.name);
      formData.append('slug', this.addProductForm.value.slug);
      formData.append('description', this.addProductForm.value.description);
      formData.append('price', this.addProductForm.value.price);
      formData.append('image', this.fileHolder, this.fileHolder.name);
      console.log(formData.get('price'));

      this.productservice.addProduct(formData)
      this.submit = false;
    }

  }

}
