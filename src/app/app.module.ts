import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePicker } from '@ionic-native/date-picker/ngx';


/* import { IonicStorageModule } from '@ionic/storage'; */


/* import {IonTagsInputModule} from "ionic-tags-input";
 */

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, DatePicker],
  bootstrap: [AppComponent],
})
export class AppModule {}
