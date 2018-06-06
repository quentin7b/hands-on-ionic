import { Component, Input } from '@angular/core';
import { Pony } from '../../models/pony.model';

@Component({
  selector: 'list-pony-item',
  templateUrl: 'list-pony-item.html'
})
export class ListPonyItemComponent {

  @Input("pony") pony: Pony;
  
  constructor() {
    console.log('Hello ListPonyItemComponent Component');
  }

}
