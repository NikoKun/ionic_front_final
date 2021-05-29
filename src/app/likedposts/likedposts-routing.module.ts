import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikedpostsPage } from './likedposts.page';

const routes: Routes = [
  {
    path: '',
    component: LikedpostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedpostsPageRoutingModule {}
