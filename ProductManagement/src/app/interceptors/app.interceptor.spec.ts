import { HttpClientModule, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AppInterceptor } from './app.interceptor';

describe('AppInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()],
      providers: [
        AppInterceptor,
        ToastrService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true
        }
      ]
    })
      .compileComponents();
  })
  const next: any = {
    handle: () => {
      return Observable.create((subscriber: any) => {
        subscriber.complete();
      });
    }
  };

  it('should be created', () => {
    const interceptor: AppInterceptor = TestBed.inject(AppInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('if user is login than pass token to request in interceptor', fakeAsync(() => {
    const req = new HttpRequest('GET', '/test')
    const interceptor: AppInterceptor = TestBed.inject(AppInterceptor);
    interceptor.intercept(req, next);
  }));
});
