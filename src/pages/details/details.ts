import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PonyService } from '../../services/PonyService';
import { Pony } from '../../models/pony.model';

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

  poney: Pony;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ponyService: PonyService) {
    this.poney = navParams.get("poney");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  toggleFavorite() {
    console.log('Favorite switch')
    let oldFav = this.poney.isFavorite;
    this.poney.isFavorite = !oldFav
    this
      .ponyService
      .favPony(this.poney, this.poney.isFavorite)
      .subscribe(
        () => {
          console.log('Fav ok');
        },
        error => {
          console.error('Cant fav');
          this.poney.isFavorite = oldFav;
        }
      )
  }

  static navigationParameters(poney: Pony): any {
    return {
      poney: poney
    }
  }

}
