import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../services/auth-service/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {

  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  const authMock = jasmine.createSpyObj('AuthService', ['getToken']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for canActivate() when user is Login', () => {
    authMock.getToken.and.returnValue(true);
  });

  it('should return fasle for canActivate() when user is Not Login', () => {
    authMock.getToken.and.returnValue(false);
    expect(guard.canActivate()).toBeFalsy();
  });
});
