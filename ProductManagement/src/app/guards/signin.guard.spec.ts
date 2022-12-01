import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../services/auth-service/auth.service';

import { SigninGuard } from './signin.guard';



describe('SigninGuard', () => {
  let guard: SigninGuard;
  const authMock = jasmine.createSpyObj('AuthService', ['getToken']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ToastrModule.forRoot()],
      providers: [AuthService]
    });
    guard = TestBed.inject(SigninGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for canActivate() when user is Not Login', () => {
    authMock.getToken = false;
    expect(guard.canActivate()).toBeTruthy();

  });

  it('should return fasle/navigate for canActivate() when user is Login', () => {
    authMock.getToken = true;
    expect(guard.canActivate()).toBeFalsy();
  });
});
