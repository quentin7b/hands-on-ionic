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
      .subscribe(
        isFav => {
          this.isFav = isFav === true; // Javascript baby, what if undefined or shit like that ?
        },
        error => {
          console.error('Cant know if fav', error);
        }
      )
  }

  toggleFavorite() {
    console.log('Favorite switch')
    let oldFav = this.isFav;
    this.isFav = !this.isFav;
    this
      .storageService
      .favPony(this.poney, this.isFav)
      .subscribe(
        () => {
          console.log('Fav ok');
        },
        error => {
          console.error('Cant fav');
          this.isFav = oldFav;
        }
      )
  }

  static navigationParameters(poney: any): any {
    return {
      poney: poney
    }
  }

}
