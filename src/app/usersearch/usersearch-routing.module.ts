import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersearchPage } from './usersearch.page';

const routes: Routes = [
  {
    path: '',
    component: UsersearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersearchPageRoutingModule {}
