import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './sign-in.component';
import { throwError } from 'rxjs'; // make sure to import the throwError from rxjs


describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let httpmock: HttpTestingController;
  let service: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()],
      providers: [AuthService]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SignInComponent);
    httpmock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    httpmock.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Login user', () => {
    component.signinForm?.setValue({
      email: 'sagar786@gmail.com',
      password: '12345678'
    });
    const user = {
      data: {
        user: {
          id: '',
          first_name: '',
          last_name: '',
          user_name: '',
          profile_image: '',
          email: ''
        },
        token: ''
      },
      msg: ''
    }
    component.onSubmit();
    service.signIn(new FormData());
    const req = httpmock.expectOne(`${environment.baseApi}login`)
    req.flush(user);
  });

  it('should give error for invalid email or password', fakeAsync(() => {
    component.signinForm?.setValue({
      email: 'dsfsdfsdfsdf@gmail.com',
      password: '12345678dfsdf'
    });
    component.onSubmit();
    service.signIn(new FormData());
    const req = httpmock.expectOne(`${environment.baseApi}login`)
    const msg = '401 (Unauthorized)';
    req.flush(msg, { status: 401, statusText: 'Unauthorized' });
  }))

  it('should keydown function call', () => {
    component.onkeydown();
    expect(component.message).toBe('');
  });

});
