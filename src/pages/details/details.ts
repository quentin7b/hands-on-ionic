import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  poney: {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.poney = navParams.get("poney");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  static navigationParameters(poney: any): any {
    return {
      poney: poney
    }
  }

}
