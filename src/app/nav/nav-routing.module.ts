import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ViewUserComponent } from '../dashboard/view-user/view-user.component';
import { EditUserComponent } from '../dashboard/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent }
    ]
  },
  {
    path: 'user',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view/:id', component: ViewUserComponent },
      { path: 'edit/:id', component: EditUserComponent }
    ]
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
