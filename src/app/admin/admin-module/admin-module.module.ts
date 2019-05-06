import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SidebarModule } from "ng-sidebar";


//All component imported here
import { AdminResponseComponent } from '../admin-response/admin-response.component';
import { CardSaleDetailsComponent } from '../card-sale-details/card-sale-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { WithdrawDetailsComponent } from '../withdraw-details/withdraw-details.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminRoutingModule } from '../admin-routing.module';

@NgModule({
  declarations: [
    AdminResponseComponent,
    CardSaleDetailsComponent,
    DashboardComponent,
    SideBarComponent,
    WithdrawDetailsComponent,
    AdminComponent
  ],
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  AdminRoutingModule,
  SidebarModule
  ]
})
export class AdminModuleModule { }
