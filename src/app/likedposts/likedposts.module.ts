import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikedpostsPageRoutingModule } from './likedposts-routing.module';

import { LikedpostsPage } from './likedposts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikedpostsPageRoutingModule
  ],
  declarations: [LikedpostsPage]
})
export class LikedpostsPageModule {}
