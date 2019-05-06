import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../service/upload-file.service';
import { AuthService } from "../../service/auth.service";;
import { CardSale } from '../../models/cardSale.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  list:CardSale [];
  email:string;
  //listId:string;
  constructor(
    private uploadSerivice: UploadFileService,
    private auth: AuthService,
  ) { 
    this.auth.getAuth().subscribe(auth => {
      this.email  = auth.email;
      console.log(this.email);
    });
  }

  ngOnInit() {
    this.uploadSerivice.getCardSales().subscribe(res=>{
      this.list = res.map(item =>{
        return {
          id: item.payload.doc. id,
          ...item.payload.doc.data()
        } as CardSale
      })
   console.log(this.list) })
  }
}
