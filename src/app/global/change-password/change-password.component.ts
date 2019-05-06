import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from '../../service/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


  passwordForm = new FormGroup ({
   email: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  change(value){
    this.auth.resetPassword(value.email);
    this.router.navigate(['/sign_in'])
  }
}
