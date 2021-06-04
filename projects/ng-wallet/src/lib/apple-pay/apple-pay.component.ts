import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apple-pay',
  templateUrl: './apple-pay.component.html',
  styleUrls: ['./apple-pay.component.scss']
})
export class ApplePayComponent {

  @Input() buttonStyle?:       string;
  @Input() buttonType?:        string;
  @Input() buttonLocale?:      string;
  @Input() width?:             string;
  @Input() height?:            string;
  @Input() borderRadius?:      string;


  constructor() { }
}
