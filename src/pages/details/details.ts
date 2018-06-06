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

  pony: Pony;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ponyService: PonyService) {
    this.pony = navParams.get("pony");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  toggleFavorite() {
    console.log('Favorite switch')
    let oldFav = this.pony.isFavorite;
    this.pony.isFavorite = !oldFav
    this
      .ponyService
      .favPony(this.pony, this.pony.isFavorite)
      .subscribe(
        () => {
          console.log('Fav ok');
        },
        error => {
          console.error('Cant fav');
          this.pony.isFavorite = oldFav;
        }
      )
  }

  static navigationParameters(pony: Pony): any {
    return {
      pony: pony
    }
  }

}
