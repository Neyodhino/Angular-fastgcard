import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SidebarModule } from "ng-sidebar";

import { UserRoutingModule } from './../user-routing.module';
import { UserSideBarComponent } from './../user-side-bar/user-side-bar.component';
import { SellCardComponent } from '../sell-card/sell-card.component';
import { WithdrawalComponent } from '../withdrawal/withdrawal.component';
import { CardRecordComponent } from '../card-record/card-record.component';
import { UserCardDetailsComponent } from '../user-card-details/user-card-details.component';
import { UserWithdrawDetailsComponent } from '../user-withdraw-details/user-withdraw-details.component';
import { UserComponent } from '../user.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

//All component imported here..
@NgModule({
    declarations: [
        UserDashboardComponent,
        UserSideBarComponent,
        UserDashboardComponent,
        SellCardComponent,
        WithdrawalComponent,
        CardRecordComponent,
        UserCardDetailsComponent,
        UserWithdrawDetailsComponent,
        UserComponent,
        UserSideBarComponent, 
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarModule
    ]
})
export class UserModule { }
