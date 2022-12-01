import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product-service/product.service';
import { environment } from 'src/environments/environment';
import { AddEditProductComponent } from './add-edit-product.component';

describe('AddEditProductComponent', () => {
  let component: AddEditProductComponent;
  let fixture: ComponentFixture<AddEditProductComponent>;
  let service: ProductService;
  let httpmock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditProductComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule],
      providers: [ProductService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddEditProductComponent);
    router = TestBed.inject(Router);
    httpmock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    spyOn(router, 'navigate');
    fixture.detectChanges();
  })
  afterEach(() => {
    httpmock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should add Product', () => {
    component.addProductForm?.setValue({
      name: 'sdaa',
      slug: 'sad',
      description: 'asdsd',
      price: 12,
      image: File
    })
    component.add();
    const productData = {
      data: {
        name: 'asdf',
        slug: 'dsfsdf',
        description: 'fdfd',
        price: '56',
        image: 'aabc.jpg'
      }
    }
    service.add(new FormData());
    const req = httpmock.expectOne(`${environment.baseApi}products`);
    req.flush(productData);
  });

  it('should Edit Product', () => {
    component.prodId = 2;
    component.addProductForm?.setValue({
      name: 'sdaa',
      slug: 'sad',
      description: 'asdsd',
      price: 12,
      image: 'abc.jpg'
    })
  
    component.add();
    expect(service.edit).toBeFalsy()
  });

  it('should enter space in  price field that return false', () => {
    const evt = {
      which: 32,
      keyCode: 32,
      charCode: 32
    }
    component.isNumber(evt);
  });

  it('should enter only number', () => {
    const evt = {
      which: 30,
      keyCode: 30,
      charCode: 30
    }
    component.isNumber(evt);
  });

  it('should call onFileSelect', () => {
    fixture.detectChanges();
    let event;
    event = {
      target: {
        files: [
          {
            lastModified: 1533276674178,
            name: 'primeng.txt',
            size: 179,
            type: 'image'
          }
        ]
      }
    };
    component.onFileSelects(event);
    fixture.detectChanges();
  });
})
