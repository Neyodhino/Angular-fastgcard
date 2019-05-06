import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

   _opened: boolean = false;
   _modeNum: number = 1;
   _positionNum: number = 0;
   _dock: boolean = false;
   _closeOnClickOutside: boolean = true;
   _closeOnClickBackdrop: boolean = false;
   _showBackdrop: boolean = false;
   _animate: boolean = true;
   _trapFocus: boolean = true;
   _autoFocus: boolean = true;
   _keyClose: boolean = false;
   _autoCollapseHeight: number = null;
   _autoCollapseWidth: number = null;

   _MODES: Array<string> = ['over', 'push', 'slide'];
   _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];
  email:string;
  constructor(
     private auth: AuthService,
     private router: Router,
    private toastr: ToastrService
  ) {
    this.auth.getAuth().subscribe(auth => {
      this.email  = auth.email;
    });
   }

  ngOnInit() {
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
  resetPassword(email){
    console.log(email);
    this.auth.resetPassword(email).then(res=>{
      this.toastr.show("An Email has been sent to you", 'Fastgcard Notification');
    })
  }
   _toggleOpened(): void {
    this._opened = !this._opened;
  }

   _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

   _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

   _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

   _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

   _toggleDock(): void {
    this._dock = !this._dock;
  }

   _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

   _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

   _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

   _toggleAnimate(): void {
    this._animate = !this._animate;
  }

   _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

   _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }
}
