import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailsPage } from '../details/details';

import { APIService } from '../../services/APIService'

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

  ponies: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: APIService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.apiService.allPonies().subscribe(
      data => this.ponies = data,
      err => console.error('Oops in API', err),
      () => console.log('Pony API responded')
    );
  }

  showPoney(poney) {
    this.navCtrl.push(DetailsPage, DetailsPage.navigationParameters(poney));
  }

}
