import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailsPage } from '../details/details';

import { PonyService } from '../../services/PonyService'
import { Pony } from '../../models/pony.model';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  ponies: Pony[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private ponyService: PonyService) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ListPage');
    this.ponyService.listPonies().subscribe(
      data => this.ponies = data,
      err => console.error('Oops in API', err),
      () => console.log('Pony API responded')
    );
  }

  showPoney(poney) {
    this.navCtrl.push(DetailsPage, DetailsPage.navigationParameters(poney));
  }

}
