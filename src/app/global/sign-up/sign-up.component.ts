import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  click:boolean = false
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor( 
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
  }

  tryRegister(value){
   if (value.password != value.confirmPassword) {
    this.toastr.error("password didn't match", 'Fastgcard Notification');
   } else {
    this.click = true;
    this.auth.doRegister(value).then(res=> this.click= false)
   }
  }

  google(){
    this.auth.doGoogleLogin().then(res=>{
      this.router.navigate(['/user-dashboard'])
    })
  }
}
