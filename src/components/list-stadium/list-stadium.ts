import { Component } from '@angular/core';

/**
 * Generated class for the ListStadiumComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-stadium',
  templateUrl: 'list-stadium.html'
})
export class ListStadiumComponent {

  text: string;

  constructor() {
    console.log('Hello ListStadiumComponent Component');
    this.text = 'Hello World';
  }

}
