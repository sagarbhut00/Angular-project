import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product-service/product.service';
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  addProductForm: FormBuilder | any;
  submit: any;
  productObj: any;
  prodId: any;
  fileHolder: File | undefined;

  constructor(
    public location: Location,
    private fb: FormBuilder,
    private productservice: ProductService,
    private activeroute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) {
    this.productservice.editProductObj.subscribe(res => this.productObj = res);
    this.activeroute.paramMap.subscribe(param => this.prodId = param.get('id'));
  }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: [this.prodId ? this.productObj.name : '', [Validators.required, Validators.pattern("^[a-zA-z].*")]],
      slug: [{ value: this.prodId ? this.productObj.slug : '', disabled: this.prodId }, [Validators.required, Validators.pattern("^[a-zA-z].*")]],
      description: [{ value: this.prodId ? this.productObj.description : '', disabled: this.prodId }, [Validators.required, Validators.pattern("^[a-zA-z0-9].*")]],
      price: [{ value: this.prodId ? Number(this.productObj.price) : '', disabled: this.prodId }, [Validators.required, Validators.pattern("^[1-9].*")]],
      image: [{ value: this.prodId ? 'default.jpg' : '', disabled: this.prodId }, Validators.required]
    })
  }

  isNumber(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // onFileSelect(event: any) {
  //   console.log(event);
  //   if (event.target.files && event.target.files.length) {
  //     this.addProductForm.get('image').setValue(event.target.files[0]);
  //   }
  // }

  onFileSelects(event: any) {
    const file = event.target.files[0];
    this.fileHolder = event.target.files[0];
    this.addProductForm.get('image')?.setValue(file)

  }

  add() {
    this.submit = true;
    if (this.addProductForm?.valid) {
      if (!this.prodId && this.addProductForm.get('image').value) {
        const formData = new FormData();
        formData.append('name', this.addProductForm.value.name);
        formData.append('slug', this.addProductForm.value.slug);
        formData.append('description', this.addProductForm.value.description);
        formData.append('price', this.addProductForm.value.price);
        formData.append('image', this.addProductForm.value.image);
        this.productservice.add(formData).subscribe((res: any) => {
          console.log(res);
          let dataList = this.productservice.getProductList();
          dataList.push(res.data);
          this.productservice.setProductList(dataList);
          this.toastr.success('Product Add Successfull!')
          this.router.navigate(['dashboard/product']);
        });
      }
      else {
        let data = {
          id: this.productObj.id,
          name: this.addProductForm.value.name
        }
        this.productservice.edit(data)
      }
      this.submit = false;
    }
  }
}
