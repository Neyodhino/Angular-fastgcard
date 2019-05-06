import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { UploadFileService } from '../../service/upload-file.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {
  email:string;
  amount: number;
  data:any;

  withdrawForm = new FormGroup ({
    email: new FormControl(''),
    bank_name: new FormControl(''),
    account_number: new FormControl(''),
    account_name: new FormControl(''),
    amount: new FormControl(''),
    date: new FormControl(''),
    status: new FormControl('')
  });

  constructor(
    private uploadFile: UploadFileService,
    private auth: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) { 

  }
  ngOnInit() {
    this.auth.getAuth().subscribe(auth=>{
      this.email = auth.email;
      this.withdrawForm.controls['email'].setValue(this.email);
      this.withdrawForm.controls['date'].setValue(new Date());
      
      this.firestore.collection('users', ref=>ref.where('email', '==', this.email)).valueChanges().subscribe(res=>{
          [this.data] = res;
          this.amount = this.data['amount'];
      })
    })
  }
  withdraw(value){
    if (value.amount > this.amount) {
      this.toastr.error('Insufficient Fund', 'Fastgcard notification')
    } else {
      this.uploadFile.withdraw(value); 
    }
  }

  resetPassword(email){
    this.auth.resetPassword(email);
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
