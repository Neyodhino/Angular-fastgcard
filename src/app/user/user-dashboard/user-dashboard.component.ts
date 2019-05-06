import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UploadFileService } from '../../service/upload-file.service';
import { WhereQuery } from '../../models/whereQuery.model';
import { User } from '../../models/user.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  list:WhereQuery[];
  user:User[];
  email: string;
  uid: string;
  data:object;
  database = firebase.firestore();

  constructor(
    private auth: AuthService,
    private uploadFile: UploadFileService,
  ) {
    }

  ngOnInit(
  ) {
    this.auth.getAuth().subscribe(auth => {
      this.email  = auth.email;
      this.uid = auth.uid;
      console.log(this.email);

      this.uploadFile.getEmailCardSale(this.email).subscribe(res=>{
        this.list = res.map(item =>{
          return {
            id: item.payload.doc. id,
            ...item.payload.doc.data()
          } as WhereQuery
        })
      });
     
     this.uploadFile.getEmailUser(this.email).subscribe(res=>{
       this.user = res.map(item=>{
         return{
           id: item.payload.doc.id,
           ...item.payload.doc.data()
         }as User
       })
       console.log(this.user);
     })
      });
  }
}
