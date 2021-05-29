import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsestoyouPage } from './responsestoyou.page';

const routes: Routes = [
  {
    path: '',
    component: ResponsestoyouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsestoyouPageRoutingModule {}
