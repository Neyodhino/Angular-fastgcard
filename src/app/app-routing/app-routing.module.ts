import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from '../guards/auth.guard';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

//All component import here
import { HomeComponent } from '../LandingPage/home.component';
import { SignComponent } from  '../../app/global/sign/sign.component';
import { SignUpComponent } from '../../app/global/sign-up/sign-up.component';
import { ChangePasswordComponent } from '../global/change-password/change-password.component';


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent, runGuardsAndResolvers: 'always'},
  { path: '', component: HomeComponent, runGuardsAndResolvers: 'always' },
  { path: 'sign_in', component: SignComponent, runGuardsAndResolvers: 'always' },
  { path: 'sign_up', component: SignUpComponent, runGuardsAndResolvers: 'always' },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'user', loadChildren: "../user/user-module/user.module#UserModule" },
  { path: 'admin', loadChildren: "../admin/admin-module/admin-module.module#AdminModuleModule" }
  // { path: 'sell-card', component:SellCardComponent, canActivate:[AuthGuard], runGuardsAndResolvers: 'always' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports:[RouterModule],
  providers: [ AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
