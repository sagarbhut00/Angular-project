import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot()],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setToken in localStorage', () => {
    let token = 'sdfsdfwesvs6455'
    spyOn(service, 'setToken').and.callThrough();
    service.setToken(token);
    expect(localStorage.getItem('Token')).toBe(token);
  });

  it('should getToken means if login than return true', () => {
    spyOn(service, 'getToken').and.returnValue(true);
  });
  
  it('should getToken means if Not login than return false', () => {
    spyOn(service, 'getToken').and.returnValue(false);
  });

  it('should user login with valid data', (() => {
    let obj = new FormData();
    obj.append('email', 'sagar786@gmail.com');
    obj.append('password', '12345678');
    spyOn(service, 'signIn').and.callThrough();
    service.signIn(obj);
  }));

  it('should user Signup with valid data', (() => {
    let obj = new FormData();
    obj.append('first_name', 'dsfsf');
    obj.append('last_name', 'dsfdfs');
    obj.append('name', 'sdfsd');
    obj.append('user_name', 'sdfsf');
    obj.append('email', 'sagar786@gmail.com');
    obj.append('password', '12345678');
    obj.append('profile_image', 'abc.jpg');

    spyOn(service, 'signUp').and.callThrough();
    service.signIn(obj);
  }));

});
