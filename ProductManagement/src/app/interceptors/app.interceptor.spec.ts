import { HttpClientModule, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';
import { AppInterceptor } from './app.interceptor';

describe('AppInterceptor', () => {
  let authservice: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()],
      providers: [
        AppInterceptor,
        ToastrService,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true
        }
      ]
    })
      .compileComponents();
    authservice = TestBed.inject(AuthService);
  })
  const next: any = {
    handle: () => {
      return Observable.create((subscriber: any) => {
        subscriber.complete();
      });
    }
  };

  it('should be created', fakeAsync(() => {
    const interceptor: AppInterceptor = TestBed.inject(AppInterceptor);
    let token = 'dsfsadasd99999';
    authservice.setToken(token);
    tick();
    expect(interceptor).toBeTruthy();
  }));

  it('if user is login than pass token to request in interceptor', fakeAsync(() => {
    const req = new HttpRequest('GET', '/test');
    const interceptor: AppInterceptor = TestBed.inject(AppInterceptor);
    tick();
    interceptor.intercept(req, next);
  }));
});
