import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.ponies = [{
      avatar_url: 'https://fr.cdn.v5.futura-sciences.com/buildsv6/images/mediumoriginal/4/6/5/46540c971c_nodam_2933-1024x768-3798d.jpg',
      name: 'John',
      description: 'John is a wonderful poney'
    }, {
      avatar_url: 'https://fr.cdn.v5.futura-sciences.com/buildsv6/images/mediumoriginal/4/6/5/46540c971c_nodam_2933-1024x768-3798d.jpg',
      name: 'Joh 2',
      description: 'John2 is also a wonderful poney'
    }];
  }

}
