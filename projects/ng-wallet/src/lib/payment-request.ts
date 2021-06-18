import { ApplePayJS } from 'projects/ng-wallet/src/lib/apple-pay/applePay';
export class PaymentRequestNGWallet {
  allowedAuthMethods!:                  string[];
  allowedCardNetworks!:                 string[];
  gateway!:                             string
  gatewayMerchantId!:                   string;
  merchantId!:                          string;
  merchantName!:                        string;
  totalPriceStatus!:                    string;
  totalPriceLabel!:                     string;
  totalPrice!:                          string;
  currencyCode!:                        string;
  countryCode!:                         string;
}

export function doPaymentRequestGoogle(paymentRequest: PaymentRequestNGWallet): google.payments.api.PaymentDataRequest {

  return {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: doType(),
        parameters: {
          allowedAuthMethods: doAllowedPaymentAuthMethod(paymentRequest.allowedAuthMethods),
          allowedCardNetworks: doAllowedCardNetworks()
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US'
    }
  }
}

export function doPaymentRequestApple(): ApplePayJS.ApplePayPaymentRequest {

}

function doAllowedPaymentAuthMethod(allowed: string[]): google.payments.api.CardAuthMethod[] {

  const pan: google.payments.api.CardAuthMethod = 'PAN_ONLY';
  const crypto: google.payments.api.CardAuthMethod = 'CRYPTOGRAM_3DS';
  const toReturn: google.payments.api.CardAuthMethod[] = new Array<google.payments.api.CardAuthMethod>();
  allowed.forEach(a => {
    if (a === 'PAN') {
      toReturn.push(pan);
    }
    if (a === 'CRYPTOGRAM') {
      toReturn.push(crypto);
    }
  })
  return toReturn;
}

function doAllowedCardNetworks(/** pass parameter to filter */): google.payments.api.CardNetwork[] {
  return ['AMEX', 'VISA', 'MASTERCARD']/**filter data */
}

function doType(/**pass parameter to filter */): google.payments.api.PaymentMethodType {
  return 'CARD'/**filter data */
}
