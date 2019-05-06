import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit, OnDestroy {
  click:boolean = false;
  navigationSubscription;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { 
    this.navigationSubscription = this.router.events.subscribe((e: any)=>{
      if (e instanceof NavigationEnd){
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites(){}
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.navigationSubscription){
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit() {
  }
  login(value){
    this.click = true;
    this.auth.login(value).then(res=>{
      this.click=false;
    })
  }

  google(){
    this.auth.doGoogleLogin().then(res=>{
      this.router.navigate(['/user']);
    })
  }
}
