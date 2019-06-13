import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  post:object;
  constructor( 
    public afAuth: AngularFireAuth, 
    private toastr: ToastrService, 
    private firestore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
    ) { }

 doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
      
    })
  })
}
//send email verification when new user sign up
sendVerificationMail(){
  return this.afAuth.auth.currentUser.sendEmailVerification()
  .then(()=>{
    this.toastr.info("we have sent you a confirmation email. Please check your inbox to verify your email address and sign in", "Fastgcard Notification");
    this.router.navigate(['/sign_in'])
  })
}

doRegister(value){
return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
.then((result)=>{
  this.sendVerificationMail()
  this.post={
    email: value.email,
    password: value.password,
    amount: 0.00
  }
  this.saveUser(this.post);
}).catch((error)=>{
  console.log(error)
  if (error.message == "The email address is badly formatted.") {
    this.toastr.error('Invalid Email Address.', 'Fastgcard Notification')
  }else if(error.message == "Password should be at least 6 characters"){
    this.toastr.error("password should be at least 6 characters.", 'Fastgcard Notificattion')
  }else if(error.code == "auth/network-request-failed"){
    this.toastr.error("Network error, Please check your internet connection", 'Fastgcard Notification')
  }
})
}

private saveUser(value){
  this.firestore.collection('users').add(value);
}

//sign it with email and password
  async login(value){
  try {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
    if (result.user.email == 'fastgcard@yahoo.com' && result.user.emailVerified !== false) {
      this.router.navigate(['/admin']);
    }
    else if (result.user.emailVerified !== true) {
      this.toastr.error('Please validate your email address. Kindly check your inbox.', 'Fastgcard Notification');
    }
    else {
      this.ngZone.run(() => {
        this.router.navigate(['/user']);
      });
      this.toastr.success('Welcome to your Dashboard', 'Fastgcard Notification');
    }
  }
  catch (err) {
    console.log(err);
    if (err.message == 'The email address is badly formatted.') {
      this.toastr.error('invalid email address. Please try again', 'Fastgcard Notification');
      this.router.navigate(['/sign_in']);
    }
    else if (err.code == 'auth/user-not-found') {
      this.toastr.error('User not found. Please check your sign in credentials', 'Fastgcard Notification');
      this.router.navigate(['/sign_in']);
    }
    else if (err.code == 'auth/wrong-password') {
      this.toastr.error('Your Password is incorrect.', 'Fastgcard Notification');
    }
  }
}
getAuth(){
  return this.afAuth.authState.pipe(auth => auth);
}
resetPassword(email: string){
  return this.afAuth.auth.sendPasswordResetEmail(email).then(()=>
    this.toastr.success('An Email has been sent to you, please check your inbox', 'Fastgcard Notification')).catch((error)=>this.toastr.error("An Error Occured, Please reload", 'Fastgcard Notification'))
}

logout(){
  this.afAuth.auth.signOut();
  this.toastr.success('You are Logged out successfully', 'FastGcard Notification',  {positionClass: 'toast-bottom-right'});
}
}

