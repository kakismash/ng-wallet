import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apple-pay',
  templateUrl: './apple-pay.component.html',
  styleUrls: ['./apple-pay.component.scss']
})
export class ApplePayComponent {

  @Input() buttonType?:        string;

  constructor() { }
}
