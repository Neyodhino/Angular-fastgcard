import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//All admin component imported here....
import { DashboardComponent } from './dashboard/dashboard.component';
import { WithdrawDetailsComponent } from "./withdraw-details/withdraw-details.component";
import { CardSaleDetailsComponent } from "./card-sale-details/card-sale-details.component";
import { AdminResponseComponent } from "./admin-response/admin-response.component";
import { AuthGuard } from "../guards/auth.guard";

const adminRoutes:Routes = [
  { path: '', component: DashboardComponent,canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'withdraw-details', component:WithdrawDetailsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'cardSaleDetails/:id', component: CardSaleDetailsComponent, runGuardsAndResolvers: 'always' },
  { path: 'admin-response/:id', component: AdminResponseComponent, runGuardsAndResolvers: 'always' }
]
@NgModule ({
    imports: [
    RouterModule.forChild(adminRoutes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {}  