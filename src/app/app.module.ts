import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';

import { ComponentsModule } from '../components/components.module'


import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { DetailsPage } from '../pages/details/details';

import { APIService } from '../services/APIService'
import { StorageService } from '../services/StorageService'
import { PonyService } from '../services/PonyService'


@NgModule({
  declarations: [
    MyApp,
    ListPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    APIService,
    StorageService,
    PonyService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
