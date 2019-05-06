import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../service/upload-file.service';
import { AuthService } from "../../service/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
@Component({
  selector: 'app-user-card-details',
  templateUrl: './user-card-details.component.html',
  styleUrls: ['./user-card-details.component.scss']
})
export class UserCardDetailsComponent implements OnInit {
  id:string;
  cardSale:{
    email: '',
    cardType:'',
    remark: '',
    url: '',
    adminMessage: '',
    adminImageUrl: '',
    amount: '',
    status: '',

  };

  constructor(
    private auth: AuthService,
    private uploadFile: UploadFileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    //Get cardSale id...
    this.id = this.route.snapshot.params['id'];
    //Get cardSale Details
    this.uploadFile.getCardSaleDetails(this.id).subscribe(cardSale => {
      this.cardSale = cardSale;
      console.log(this.cardSale);
    })
  }
  resetPassword(email){
    this.auth.resetPassword(email);
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
