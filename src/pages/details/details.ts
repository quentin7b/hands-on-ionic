import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PonyService } from '../../services/PonyService';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private ponyService: PonyService) {
    this.poney = navParams.get("poney");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  toggleFavorite() {
    console.log('Favorite switch')
    let oldFav = this.poney['isFav'];
    this.poney['isFav'] = !oldFav
    this
      .ponyService
      .favPony(this.poney, this.poney['isFav'])
      .subscribe(
        () => {
          console.log('Fav ok');
        },
        error => {
          console.error('Cant fav');
          this.poney['isFav'] = oldFav;
        }
      )
  }

  static navigationParameters(poney: any): any {
    return {
      poney: poney
    }
  }

}
