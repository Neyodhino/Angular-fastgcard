import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../service/upload-file.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormGroup, FormControl } from '@angular/forms'
import { CardSale } from "../../models/cardSale.model";
import { User } from "../../models/user.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-response',
  templateUrl: './admin-response.component.html',
  styleUrls: ['./admin-response.component.scss']
})
export class AdminResponseComponent implements OnInit {
  list:User[];
  id:string;
  userID:string;
  cardSale:{
    adminImageUrl: string
  };

  selectedFiles: FileList;
  currentFileUpload: CardSale;
  progress: { percentage: number } = { percentage: 0 };

  uploadForm = new FormGroup ({
    cardType : new FormControl(''),
    remark : new FormControl(''),
    url: new FormControl(''),
    name : new FormControl(''),
    email : new FormControl(''),
    userId: new FormControl(''),
    amount: new FormControl(''),
    message: new FormControl('')
  });


  constructor(   
    private uploadFile: UploadFileService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private firestore: AngularFirestore
  ) { }


  ngOnInit() {
   //Get cardSale id...
   this.id = this.route.snapshot.params['id'];
   //Get cardSale Details
   this.uploadFile.getCardSaleDetails(this.id).subscribe(cardSale => {
     this.cardSale = cardSale;
     this.uploadForm.controls['cardType'].setValue(this.cardSale['cardType']);
     this.uploadForm.controls['remark'].setValue(this.cardSale['remark']);
     this.uploadForm.controls['url'].setValue(this.cardSale['url']);
     this.uploadForm.controls['name'].setValue(this.cardSale['name']);
     this.uploadForm.controls['email'].setValue(this.cardSale['email']);

    this.firestore.collection('users', ref=> ref.where('email', '==', this.cardSale['email'])).snapshotChanges().subscribe(res=>{
      this.list = res.map(item=>{
        return{
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as User
      })
      for(var element of this.list){
        this.userID = element.id;
      }
      this.uploadForm.controls['userId'].setValue(this.userID);
    })
   })
  }
  selectFile(event) {
    const file = event.target.files.item(0);
 
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      this.toastr.error('please choose a valid image format', 'FastGcard Notification');
    }
  }

  confirm(value){
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new CardSale(file);
    this.uploadFile.pushConfirmAdminResponseToStorage(this.id, this.currentFileUpload, value, this.progress);
  }

  decline(value){
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new CardSale(file);
    //console.log(value, this.id, this.currentFileUpload);
    this.uploadFile.pushDeclineAdminResponseToStorage(this.id, this.currentFileUpload, value, this.progress);
  }
}
