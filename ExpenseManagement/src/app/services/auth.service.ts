import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isSignin = new BehaviorSubject(false);
  errorSigninMessage = new BehaviorSubject('');
  errorSignupMessage = new BehaviorSubject('');

  constructor(private fireservice: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  async signIn(email: string, password: string) {
    this.isSignin.next(true);

    return await this.fireservice.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user));
      this.toastr.success('Sign In Successfull!..');
      this.router.navigate(['main/dashboard']);
    })
      .catch(error => {
        this.isSignin.next(false);
        console.log(error.code);
        if (error.code === 'auth/wrong-password') {
          this.errorSigninMessage.next('*Password is incorrect');
        }
        else if (error.code === 'auth/user-not-found') {
          this.errorSigninMessage.next('*Invalid Email');
        }
      });
  }

  async signUp(email: string, password: string) {
    return await this.fireservice.createUserWithEmailAndPassword(email, password).then(res => {
      console.log(res);
      this.router.navigate(['']);
    })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          this.errorSignupMessage.next('*Email is already exist');
        }
      });
  }

  onNavigate(path:string){
    this.router.navigate([path]);
  }
}
