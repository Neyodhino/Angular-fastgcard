import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../service/upload-file.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-card-sale-details',
  templateUrl: './card-sale-details.component.html',
  styleUrls: ['./card-sale-details.component.scss']
})
export class CardSaleDetailsComponent implements OnInit {
  
  id:string;
  cardSale:{
    email : '',
    cardType: '',
    remark: '',
    url: '';
  };

  constructor(
    private uploadFile: UploadFileService,
    private route: ActivatedRoute
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
}
