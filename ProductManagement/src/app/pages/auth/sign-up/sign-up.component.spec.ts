import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { environment } from 'src/environments/environment';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authservice: AuthService;
  let httpmock: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()],
      providers: [AuthService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    httpmock = TestBed.inject(HttpTestingController);
    authservice = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    component.onFileSelect(event);
    fixture.detectChanges();
  });

  it('should onSubmit', () => {
    component.signupForm?.setValue({
      first_name: '',
      last_name: 'jayho',
      name: 'good',
      email: '',
      password: '12345678',
      user_name: 'dfsf',
      profile_image: File
    })
    component.onSubmit();
  });

  it('should onSubmit', () => {
    component.signupForm?.setValue({
      first_name: 'abc',
      last_name: 'jayho',
      name: 'good',
      email: 'good@gmail.com',
      password: '12345678',
      user_name: 'dfsf',
      profile_image: File
    })
    component.onSubmit();

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
    authservice.signUp(new FormData());
    const req = httpmock.expectOne(`${environment.baseApi}register`)
    req.flush(user);
  });

  it('should enter taken email and register, get error', () => {
    component.signupForm?.setValue({
      first_name: 'abc',
      last_name: 'jayho',
      name: 'good',
      email: 'sagar786@gmail.com',
      password: '12345678',
      user_name: 'dfsf',
      profile_image: File
    })
    component.onSubmit();
    authservice.signUp(new FormData());
    const req = httpmock.expectOne(`${environment.baseApi}register`)
    const msg = '401 (Unauthorized)';
    req.flush(msg, { status: 401, statusText: 'Unauthorized' });
  });

  it('should keydown function call', () => {
    component.onkeydown();
    expect(component.emailMsg).toBe('');
  })
});
