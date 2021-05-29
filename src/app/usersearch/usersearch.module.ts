import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { UsersearchPageRoutingModule } from './usersearch-routing.module';

import { UsersearchPage } from './usersearch.page';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersearchPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [UsersearchPage]
})
export class UsersearchPageModule {}
