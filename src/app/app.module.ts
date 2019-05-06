//all module imports here....
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AdminModuleModule } from './admin/admin-module/admin-module.module';
import { SidebarModule } from "ng-sidebar";
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from "././material/material/material.module";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from './../environments/environment';
import { AuthService } from "./service/auth.service";

//All global components here...
import { AppComponent } from './app.component';
import { HomeComponent } from '././LandingPage/home.component';
import { NavbarComponent } from '././global/navbar/navbar.component';
import { FooterComponent } from '././global/footer/footer.component';
import { SignComponent } from  './global/sign/sign.component';
import { SignUpComponent } from './global/sign-up/sign-up.component';
import { SpinnerComponent } from './UI/spinner/spinner.component';
import { ChangePasswordComponent } from './global/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SignComponent,
    SignUpComponent,
    SpinnerComponent,
    ChangePasswordComponent,
  ], 
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    MaterialModule,
    SidebarModule.forRoot(),
    AppRoutingModule,
    // SharedModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
