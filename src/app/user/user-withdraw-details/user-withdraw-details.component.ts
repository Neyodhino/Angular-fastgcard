import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Route, Router } from '@angular/router';
import { UploadFileService } from '../../service/upload-file.service';
import { AngularFirestore} from '@angular/fire/firestore';
import { WhereQuery } from '../../models/whereQuery.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-withdraw-details',
  templateUrl: './user-withdraw-details.component.html',
  styleUrls: ['./user-withdraw-details.component.scss']
})
export class UserWithdrawDetailsComponent implements OnInit {
  list:WhereQuery[];
  email: string;
  uid: string;
  data:object;
  database = firebase.firestore()

  constructor(
    private route: Router,
    private auth: AuthService,
    private uploadFile: UploadFileService,
    private firestore: AngularFirestore,
    // private db: AngularFireDatabase
  ) {
    }

  ngOnInit(
  ) {
    this.auth.getAuth().subscribe(auth => {
      this.email  = auth.email;
      this.uid = auth.uid;
      console.log(this.email);

      this.uploadFile.getEmailWithdraw(this.email).subscribe(res=>{
        this.list = res.map(item =>{
          return {
            id: item.payload.doc. id,
            ...item.payload.doc.data()
          } as WhereQuery
        })
     console.log(this.list) })
      });
  }
  resetPassword(email){
    this.auth.resetPassword(email);
  }
  onLogout() {
    this.auth.logout();
    this.route.navigate(['/']);
  }
}
