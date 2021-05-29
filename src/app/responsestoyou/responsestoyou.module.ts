import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponsestoyouPageRoutingModule } from './responsestoyou-routing.module';

import { ResponsestoyouPage } from './responsestoyou.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponsestoyouPageRoutingModule
  ],
  declarations: [ResponsestoyouPage]
})
export class ResponsestoyouPageModule {}
