import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/storage';
import { Router, ActivatedRoute } from "@angular/router"; 
import { FileUpload } from '../models/file-upload';
import { ToastrService } from 'ngx-toastr';
 
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  ref = firebase.firestore().collection('cardSales');
  withdrawRef = firebase.firestore().collection('withdraw');
  private clientBasePath = '/client-uploads';
  private adminBasePath = '/admin-uploads';

  post:object;
  amount:number;
 
  constructor(
    private db: AngularFireDatabase,
    private firestore: AngularFirestore,
    //Guys, it's my editor issue.
    private toastr: ToastrService,
    public route: ActivatedRoute,
    public router: Router
    ) { }
 
  pushFileToStorage(fileUpload, value, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.clientBasePath}/${fileUpload.file.name}`).put(fileUpload.file);
 
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        this.toastr.error('Your Transanction was unccessful, please resend', 'FastGcard Notification');
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          const email = value.email;
          const cardType = value.cardType;
          const remark = value.remark;
          const date = value.date
          this.post = {
            cardType: cardType,
            remark: remark,
            url:  fileUpload.url,
            name: fileUpload.name,
            email: email,
            date: date,
            amount: '',
            status:'',
            replyMessage:'',
            adminImageUrl:''
          }
          // console.log(this.post);
          this.postFile(this.post);
          this.toastr.success('Your card was sold successfully. Please await Admin Confirmation', 'FastGcard Notification');
          this.router.navigate(['/user']);
        });
      }
    );
  }

  pushConfirmAdminResponseToStorage(id, fileUpload, value, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.adminBasePath}/${fileUpload.respondImg.name}`).put(fileUpload.respondImg);
 
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        this.toastr.error('Admin Response was not sent, please resend', 'FastGcard Notification');
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.respondImg.name;
          const email = value.email;
          const cardType = value.cardType;
          const remark = value.remark;
          const amount = value.amount;
          const replyMessage = value.message;
          this.post = {
            cardType: cardType,
            remark: remark,
            url:  fileUpload.url,
            name: fileUpload.name,
            email: email,
            amount: amount,
            replyMessage: replyMessage,
            adminImageUrl:  fileUpload.url,
            status: 'Successful',
          }
          //  console.log(value.userId, amount);
          this.getUserAmount(email).pipe(first()).subscribe(res=>{
            
            for(var element of res){
              this.amount = element['amount'];
           }
           const balance = this.amount+amount;
           this.updateUserAmount(value.userId, balance);
          })
          this.updateCardSales(id, this.post);
          this.toastr.success('Admin Response was sent Successfully', 'FastGcard Notification');
          this.router.navigate(['/admin']);
        });
      }
    );
  }
 
  pushDeclineAdminResponseToStorage(id, fileUpload, value, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.adminBasePath}/${fileUpload.respondImg.name}`).put(fileUpload.respondImg);
 
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        this.toastr.error('Admin Response was not sent, please resend', 'FastGcard Notification');
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.respondImg.name;
          const email = value.email;
          const cardType = value.cardType;
          const remark = value.remark;
          const amount = 0;
          const replyMessage = value.message;
          this.post = {
            amount: amount,
            replyMessage: replyMessage,
            adminImageUrl:  fileUpload.url,
            status: 'Unsuccessful',
          }
          this.updateCardSales(id, this.post);
          this.toastr.success('Admin Response was sent Successfully', 'FastGcard Notification');
          this.router.navigate(['/admin'])
        });
      }
    );
  }
 
  private postFile(fileUpload){
    this.firestore.collection('cardSales').add(fileUpload);
  }

  private updateCardSales(id: string, fileUpload){
    this.firestore.collection('cardSales').doc(id).update(fileUpload)
  }
  private updateUserAmount(id, amount){
    this.firestore.collection('users').doc(id).update({amount:amount});
  }
  private getUserAmount(email: string){
    return this.firestore.collection('users', ref=> ref.where('email', '==', email)).valueChanges();
  }
withdraw(value){
  this.firestore.collection('withdraw').add(value);
  this.toastr.success('Your withdrawal request was sent successfully, please await admin confirmation', 'Fastgcard Notification');
  this.router.navigate(['/user-withdraw-details']);
}
  getCardSales(){
    return this.firestore.collection('cardSales').snapshotChanges();
  }
  getWithdraw(){
    return this.firestore.collection('withdraw').snapshotChanges(); 
  }
   getEmailCardSale(email:string){
    return this.firestore.collection('cardSales', ref =>ref.where('email', '==', email)).snapshotChanges(); 
  }
  getEmailWithdraw(email:string){
    return this.firestore.collection('withdraw', ref =>ref.where('email', '==', email)).snapshotChanges(); 
  }
  getEmailUser(email: string){
    return this.firestore.collection('users', ref=> ref.where('email', '==', email)).snapshotChanges();
  }
  withdrawUpdate(id, value){
    this.firestore.collection('withdraw').doc(id).update({status:value});
    this.toastr.success('withdrawal request was confirmed successfully', 'Fastgcard Notification');
    this.router.navigate(['/admin']);
  }
  getCardSaleDetails(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          key: doc.id,
          adminImageUrl: data.adminImageUrl,
          adminMessage: data.replyMessage,
          amount: data.amount,
          cardType: data.cardType,
          date: data.date,
          email: data.email,
          name: data.name,
          remark: data.remark,
          status: data.status,
          url: data.url
        });
      });
    });
  }
  getWithdrawDetails(id: string): Observable<any> {
    return new Observable((observer) => {
      this.withdrawRef.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          key: doc.id,
          bank_name: data.bank_name,
          account_number: data.account_number,
          amount: data.amount,
          email: data.email
        });
      });
    });
  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.clientBasePath, ref =>
      ref.limitToLast(numberItems));
  }
 
  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
 
  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.clientBasePath}/`).remove(key);
  }
 
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.clientBasePath}/${name}`).delete();
  }
  
}