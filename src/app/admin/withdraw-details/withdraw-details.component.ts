import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { UploadFileService } from '../../service/upload-file.service';
import { CardSale } from '../../models/cardSale.model';
import { User } from "../../models/user.model";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-withdraw-details',
  templateUrl: './withdraw-details.component.html',
  styleUrls: ['./withdraw-details.component.scss']
})
export class WithdrawDetailsComponent implements OnInit {
  list:CardSale [];
  user:User[];
  userId:string;
  userAmount:number;
  email:string;
  balance: number;
  status:string = 'successful';
  id: string
    
  constructor(
    private uploadSerivice: UploadFileService,
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.uploadSerivice.getWithdraw().subscribe(res=>{
      this.list = res.map(item =>{
        return {
          id: item.payload.doc. id,
          ...item.payload.doc.data()
        } as CardSale
      })
      console.log(this.list);
    })
  }
  confirm(id, email, amount, value: string){
    this.uploadSerivice.withdrawUpdate( id, value);
    this.firestore.collection('users', ref=>ref.where('email', '==', email)).snapshotChanges().pipe(first()).subscribe(res=>{
      this.user = res.map(item=>{
        return{
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as User
      })
     for(var call of this.user){
      this.userId= call.id;
      this.userAmount= call.amount;
     }
     this.balance = this.userAmount - amount;
      this.firestore.collection('users').doc(this.userId).update({amount:this.balance});
    })
  }
}
