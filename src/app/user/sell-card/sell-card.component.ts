import { Component, OnInit } from '@angular/core';
import { FileUpload } from '../../models/file-upload';
import { FormGroup, FormControl } from '@angular/forms';
import { UploadFileService } from '../../service/upload-file.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sell-card',
  templateUrl: './sell-card.component.html',
  styleUrls: ['./sell-card.component.scss']
})
export class SellCardComponent implements OnInit {
  email:string;
  
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

  uploadForm = new FormGroup ({
    email: new FormControl(''),
    cardType: new FormControl(''),
    remark: new FormControl(''),
    date: new FormControl('')
  });
 
  constructor(
    private uploadService: UploadFileService,
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService
    ) { }
 
  ngOnInit() {
    this.authService.getAuth().subscribe(auth=>{
      this.email = auth.email;
      this.uploadForm.controls['email'].setValue(this.email);
      this.uploadForm.controls['date'].setValue(new Date());
    })
  }
 
  selectFile(event) {
    const file = event.target.files.item(0);
 
    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      this.toastr.error('An invalid image format, please choose from any image file format', 'Fastgcard Notification');
    }
  }
 
  upload(value) {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    
    this.currentFileUpload = new FileUpload(file);
    // console.log(value, this.currentFileUpload);
    this.uploadService.pushFileToStorage(this.currentFileUpload, value, this.progress);
  }
  onLogout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }
  resetPassword(email){
    this.authService.resetPassword(email);
  }
}
