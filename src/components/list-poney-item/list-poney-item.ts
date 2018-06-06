import { Component, Input } from '@angular/core';
import { Pony } from '../../models/pony.model';

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

  @Input("poney") poney: Pony;
  
  constructor() {
    console.log('Hello ListPoneyItemComponent Component');
  }

}
