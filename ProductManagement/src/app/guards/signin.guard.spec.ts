import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../services/auth-service/auth.service';
import { SigninGuard } from './signin.guard';



describe('SigninGuard', () => {
  let guard: SigninGuard;
  let service: AuthService;
  let router: Router;
  let authMock = jasmine.createSpyObj('AuthService', ['getToken']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot()],
      providers: [AuthService]
    });
    guard = TestBed.inject(SigninGuard);
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for canActivate() when user is Not Login', fakeAsync(() => {
    spyOn(service, 'getToken').and.returnValue(false);
    tick();
    guard.canActivate();
  }));

  it('should return fasle/navigate for canActivate() when user is Login', fakeAsync(() => {
    spyOn(service, 'getToken').and.returnValue(true);
    tick();
    guard.canActivate();
  }));
});
