import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apple-pay',
  templateUrl: './apple-pay.component.html',
  styleUrls: ['./apple-pay.component.scss']
})
export class ApplePayComponent {

  // Button configuration
  @Input() buttonStyle?:       string;
  @Input() buttonType?:        string;
  @Input() buttonLocale?:      string;
  @Input() width?:             string;
  @Input() height?:            string;
  @Input() borderRadius?:      string;

  // Define ApplePayPaymentRequest
  @Input() request: ApplePayPaymentRequest = {
            "countryCode": "US",
            "currencyCode": "USD",
            "merchantCapabilities": [
                "supports3DS"
            ],
            "supportedNetworks": [
                "visa",
                "masterCard",
                "amex",
                "discover"
            ],
            "total": {
                "label": "Demo (Card is not charged)",
                "type": "final",
                "amount": "1.99"
            }
        };

  constructor() { }

  onApplePayButtonClicked(): void {

    if (!ApplePaySession) {
        return;
    }


    // Create ApplePaySession
    const session = new ApplePaySession(3, request);

    session.onvalidatemerchant = async event => {
        // Call your own server to request a new merchant session.
        const merchantSession = await validateMerchant();
        session.completeMerchantValidation(merchantSession);
    };

    session.onpaymentmethodselected = event => {
        // Define ApplePayPaymentMethodUpdate based on the selected payment method.
        // No updates or errors are needed, pass an empty object.
        const update = {};
        session.completePaymentMethodSelection(update);
    };

    session.onshippingmethodselected = event => {
        // Define ApplePayShippingMethodUpdate based on the selected shipping method.
        // No updates or errors are needed, pass an empty object.
        const update = {};
        session.completeShippingMethodSelection(update);
    };

    session.onshippingcontactselected = event => {
        // Define ApplePayShippingContactUpdate based on the selected shipping contact.
        const update = {};
        session.completeShippingContactSelection(update);
    };

    session.onpaymentauthorized = event => {
        // Define ApplePayPaymentAuthorizationResult
        const result = {
            "status": ApplePaySession.STATUS_SUCCESS
        };
        session.completePayment(result);
    };

    session.oncancel = event => {
        // Payment cancelled by WebKit
    };

    session.begin();
  }
}
