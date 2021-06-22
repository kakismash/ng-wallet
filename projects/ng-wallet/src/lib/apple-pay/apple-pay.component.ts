import { Component, Input } from '@angular/core';
import { ApplePaySession } from 'projects/ng-wallet/src/lib/apple-pay/apple-pay-session';
import { ApplePayJS } from './applePay';
@Component({
  selector: 'apple-pay',
  templateUrl: './apple-pay.component.html',
  styleUrls: ['./apple-pay.component.scss']
})
export class ApplePayComponent {

  // Button configuration
  @Input() buttonStyle?:              string;
  @Input() buttonType?:               string;
  @Input() lang?:                     string;
  @Input() width?:                    string;
  @Input() height?:                   string;
  @Input() borderRadius?:             string;

  // Define Apple Pay Version
  @Input() version!:                  number;

  // Define ApplePayPaymentRequest
  @Input() paymentRequest!:           ApplePayJS.ApplePayPaymentRequest;

  // Define Apple Merchant
  @Input() appleMerchant!:            string;

  constructor() { }

  onApplePayButtonClicked(): void {

    if (!ApplePaySession) {
        return;
    }


    // Create ApplePaySession
    const session = new ApplePaySession(this.version, this.paymentRequest);

    session.onvalidatemerchant = event => {
        // Call your own server to request a new merchant session.
        fetch(this.appleMerchant)
          .then(res => res.json()) // Parse response as JSON.
          .then(merchantSession => {
            session.completeMerchantValidation(merchantSession);
          })
          .catch(err => {
            console.error('Error fetching merchant session', err);
          });
    };

    session.onpaymentauthorized = event => {
        session.completePayment(ApplePaySession.STATUS_SUCCESS);
    };

    session.oncancel = event => {
        // Payment cancelled by WebKit
    };

    session.begin();
  }
}
