import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { takeWhile } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let httpmock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [ProductService,
        { provide: Router, useValue: router }
      ]
    })
    service = TestBed.inject(ProductService);
    httpmock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have add function', () => {
    let data = new FormData();
    data.append('name', 'gfgfdg');
    data.append('slug', 'fgf');
    data.append('description', 'fgdgdf');
    data.append('price', '423');
    data.append('image', 'dfgf.png');

    spyOn(service, 'add').and.callThrough();
    service.add(data);

  });

  it('should have delete function', () => {
    const index = 3;
    const obj = {
      id: '12',
      name: 'gfgfdg',
      slug: 'gdfg',
      description: 'fgfdgfd',
      price: '5445',
      image: 'gfg.png'
    }
    spyOn(service, 'delete').and.callThrough();
    service.delete(index, obj);
    expect(service.getProductList).not.toContain(obj);
  });

  it('should have edit function', () => {
    const productData = {
      data: {
        id: 2,
        name: 'sdaa',
        slug: 'sad',
        description: 'asdsd',
        price: 12,
        image: 'abc.jpg'
      }
    }
    service.edit(new FormData());
    const req = httpmock.expectOne(`${environment.baseApi}products/update`);
    expect(req.request.method).toEqual('POST');
    req.flush(productData);
  });
});
