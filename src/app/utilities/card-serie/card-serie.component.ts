import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ISerie } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-card-serie',
  templateUrl: './card-serie.component.html',
  styleUrls: ['./card-serie.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardSerieComponent {
  @Input() data: ISerie[] = [];
}
