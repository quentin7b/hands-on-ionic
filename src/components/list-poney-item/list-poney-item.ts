import { Component, Input } from '@angular/core';

/**
 * Generated class for the ListPoneyItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-poney-item',
  templateUrl: 'list-poney-item.html'
})
export class ListPoneyItemComponent {

  @Input("poney") poney: any;

  avatar_url: string;
  name: string;
  description: string;
  isFav: boolean;

  constructor() {
    console.log('Hello ListPoneyItemComponent Component');
    this.poney = {};
  }

  ngAfterContentInit() {
    this.avatar_url = this.poney.avatar_url
    this.name = this.poney.name
    this.description = this.poney.description
    this.isFav = this.poney.isFav
  }

}
