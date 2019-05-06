import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from './../guards/auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component'; 
import { SellCardComponent } from './sell-card/sell-card.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { UserWithdrawDetailsComponent } from './user-withdraw-details/user-withdraw-details.component';
import { UserCardDetailsComponent } from './user-card-details/user-card-details.component';
import { CardRecordComponent } from './card-record/card-record.component';

const userRoutes: Routes = [
        { path: '', component: UserDashboardComponent },
        { path: 'sell-card', component: SellCardComponent },
        { path: 'withdraw', component:WithdrawalComponent,canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
        { path: 'card-record', component:CardRecordComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
        { path: 'user-withdraw-details', component:UserWithdrawDetailsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
        { path: 'user-card-details/:id', component: UserCardDetailsComponent, runGuardsAndResolvers: 'always' },
]

@NgModule({
    imports:[RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}