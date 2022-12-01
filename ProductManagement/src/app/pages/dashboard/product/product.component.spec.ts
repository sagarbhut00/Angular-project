import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductComponent } from './product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let router: Router;
  let httpmock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    router = TestBed.inject(Router);
    httpmock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    spyOn(router, 'navigate');
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Add Product', () => {
    spyOn(component, 'addProduct').and.callThrough();
    component.addProduct();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard/product/add']);
  });

  it('should View Product', () => {
    const obj = {
      id: '12',
      name: 'sada',
      slug: 'dsada',
      description: 'sdfdf',
      price: '45',
      img: 'img.jpg'
    }
    spyOn(component, 'viewProduct').and.callThrough();
    component.viewProduct(obj);
    expect(component.product).toBe(obj);
  });

  it('should Edit Product', () => {
    const obj = {
      id: '12',
      name: 'sada',
      slug: 'dsada',
      description: 'sdfdf',
      price: '45',
      img: 'img.jpg',
    }
    spyOn(component, 'editProduct').and.callThrough();
    component.editProduct(obj);
    expect(router.navigate).toHaveBeenCalledWith(['dashboard/product/edit', obj.id]);
  });

  it('should Delete Product', () => {
    const index = 3;
    const obj = {
      id: '12',
      name: 'sada',
      slug: 'dsada',
      description: 'sdfdf',
      price: '45',
      img: 'img.jpg',
    }
    spyOn(component, 'deleteProduct').and.callThrough();
    component.deleteProduct(index, obj);
    expect(component.productList).not.toContain(obj);
  });
});
