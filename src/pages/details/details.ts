import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StorageService } from '../../services/StorageService';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  poney: {};
  isFav: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storageService: StorageService) {
    this.poney = navParams.get("poney");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this
      .storageService
      .isFav(this.poney)
      .then(isFav => {
        console.log('looks fav ?', isFav)
      })
      .catch(error => {
        console.error('Cant know if fav');
      })
  }

  toggleFavorite() {
    console.log('Favorite switch')
    this.isFav = !this.isFav;
  }

  static navigationParameters(poney: any): any {
    return {
      poney: poney
    }
  }

}
