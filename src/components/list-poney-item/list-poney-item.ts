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
  
  constructor() {
    console.log('Hello ListPoneyItemComponent Component');
  }

}