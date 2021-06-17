import { Component, Input } from '@angular/core';
import { ApplePaySession } from 'projects/ng-wallet/src/lib/apple-pay/ApplePaySession';
import { ApplePayJS } from './applePay';
@Component({
  selector: 'apple-pay',
  templateUrl: './apple-pay.component.html',
  styleUrls: ['./apple-pay.component.scss']
})
export class ApplePayComponent {

  // Button configuration
  @Input() buttonStyle?:              string;
  @Input() buttonTypeApple?:          string;
  @Input() lang?:                     string;
  @Input() width?:                    string;
  @Input() height?:                   string;
  @Input() borderRadius?:             string;

  // Define ApplePayPaymentRequest
  @Input() paymentRequest!:           ApplePayJS.ApplePayPaymentRequest;

  // Define endPoint
  @Input() endPointApple!:            string;

  // Define payment method.
  @Input() total!:                    ApplePayJS.ApplePayLineItem;

  @Input() lineItems!:                Array<ApplePayJS.ApplePayLineItem>;

  // Define shipping method.
  @Input() shippingMethods!:          Array<ApplePayJS.ApplePayShippingMethod>;


  // Define shipping contact.
  @Input() shippingContact!:          ApplePayJS.ApplePayPaymentContact;


  constructor() { }

  onApplePayButtonClicked(): void {

    if (!ApplePaySession) {
        return;
    }


    // Create ApplePaySession
    const session = new ApplePaySession(3, this.paymentRequest);

    session.onvalidatemerchant = event => {
        // Call your own server to request a new merchant session.
        fetch(this.endPointApple)
          .then(res => res.json()) // Parse response as JSON.
          .then(merchantSession => {
            session.completeMerchantValidation(merchantSession);
          })
          .catch(err => {
            console.error('Error fetching merchant session', err);
          });
    };

    session.onpaymentmethodselected = event => {
        session.completePaymentMethodSelection(this.total, this.lineItems);
    };

    session.onshippingmethodselected = event => {
        session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS,
                                                  this.total,
                                                  this.lineItems);
    };

    session.onshippingcontactselected = event => {
        session.completeShippingContactSelection(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS,
                                                  this.shippingMethods,
                                                  this.total,
                                                  this.lineItems);
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
