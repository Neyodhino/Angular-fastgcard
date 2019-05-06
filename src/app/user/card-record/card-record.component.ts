import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UploadFileService } from '../../service/upload-file.service';
import { WhereQuery } from '../../models/whereQuery.model';

@Component({
  selector: 'app-card-record',
  templateUrl: './card-record.component.html',
  styleUrls: ['./card-record.component.scss']
})
export class CardRecordComponent implements OnInit {

  list:WhereQuery[];
  email: string;
  uid: string;
  data:object;

  constructor(
    private uploadService: UploadFileService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.getAuth().subscribe(auth => {
      this.email  = auth.email;
      this.uid = auth.uid;

      this.uploadService.getEmailCardSale(this.email).subscribe(res=>{
        this.list = res.map(item =>{
          return {
            id: item.payload.doc. id,
            ...item.payload.doc.data()
          } as WhereQuery
        })
     console.log(this.list) 
    })
      });
  }
  resetPassword(email){
    this.auth.resetPassword(email);
  }
}
