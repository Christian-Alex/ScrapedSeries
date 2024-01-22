import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-loading',
  templateUrl: './card-loading.component.html',
  styleUrls: ['./card-loading.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardLoadingComponent {
  @Input() cantCards: number = 0;
  @Input() frontPages: number = 0;

  range(fin: number) {
    return new Array(fin - 1 + 1).fill(0).map((x, i) => 1 + i);
  }
}
