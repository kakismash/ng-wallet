import { ApplePayJS } from 'projects/ng-wallet/src/lib/apple-pay/applePay';
export class PaymentRequestNGWallet {

  typePaymentMethod!:                   string;
  allowedAuthMethods!:                  string[];
  allowedCardNetworks!:                 string[];
  typeTokenization!:                    string;
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
        type: doTypePaymentMethod(paymentRequest.typePaymentMethod),
        parameters: {
          allowedAuthMethods: doAllowedPaymentAuthMethod(paymentRequest.allowedAuthMethods),
          allowedCardNetworks: doAllowedCardNetworks(paymentRequest.allowedCardNetworks)
        },
        tokenizationSpecification: {
          type: doTypeTokenization(paymentRequest.typeTokenization),
          parameters: {
            gateway: paymentRequest.gateway,
            gatewayMerchantId: paymentRequest.gatewayMerchantId
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: paymentRequest.merchantId,
      merchantName: paymentRequest.merchantName
    },
    transactionInfo: {
      totalPriceStatus: doTotalPriceStatus(paymentRequest.totalPriceStatus),
      totalPriceLabel: paymentRequest.totalPriceLabel,
      totalPrice: paymentRequest.totalPrice,
      currencyCode: paymentRequest.currencyCode.toUpperCase(),
      countryCode: paymentRequest.countryCode.toUpperCase()
    }
  }
}

export function doPaymentRequestApple(): ApplePayJS.ApplePayPaymentRequest {

}

function doAllowedPaymentAuthMethod(allowed: string[]): google.payments.api.CardAuthMethod[] {

  const pan:        google.payments.api.CardAuthMethod   = 'PAN_ONLY';
  const crypto:     google.payments.api.CardAuthMethod   = 'CRYPTOGRAM_3DS';
  const toReturn:   google.payments.api.CardAuthMethod[] = new Array<google.payments.api.CardAuthMethod>();
  allowed.forEach(a => {
    if (a === 'PAN_ONLY') {
      toReturn.push(pan);
    }
    if (a === 'CRYPTOGRAM_3DS') {
      toReturn.push(crypto);
    }
  })
  return toReturn;
}

function doAllowedCardNetworks(allowed: string[]): google.payments.api.CardNetwork[] {

  const amex:           google.payments.api.CardNetwork  = 'AMEX';
  const discover:       google.payments.api.CardNetwork  = 'DISCOVER';
  const electron:       google.payments.api.CardNetwork  = 'ELECTRON';
  const elo:            google.payments.api.CardNetwork  = 'ELO';
  const elo_debit:      google.payments.api.CardNetwork  = 'ELO_DEBIT';
  const interac:        google.payments.api.CardNetwork  = 'INTERAC';
  const jcb:            google.payments.api.CardNetwork  = 'JCB';
  const maestro:        google.payments.api.CardNetwork  = 'MAESTRO';
  const mastercard:     google.payments.api.CardNetwork  = 'MASTERCARD';
  const visa:           google.payments.api.CardNetwork  = 'VISA';

  const toReturn:       google.payments.api.CardNetwork[] = new Array<google.payments.api.CardNetwork>();

  allowed.forEach(a => {
    if (a === 'AMEX') {
      toReturn.push(amex);
    }
    if (a === 'DISCOVER') {
      toReturn.push(discover);
    }
    if (a === 'ELECTRON') {
      toReturn.push(electron);
    }
    if (a === 'ELO') {
      toReturn.push(elo);
    }
    if (a === 'ELO_DEBIT') {
      toReturn.push(elo_debit);
    }
    if (a === 'INTERAC') {
      toReturn.push(interac);
    }
    if (a === 'JCB') {
      toReturn.push(jcb);
    }
    if (a === 'MAESTRO') {
      toReturn.push(maestro);
    }
    if (a === 'MASTERCARD') {
      toReturn.push(mastercard);
    }
    if (a === 'VISA') {
      toReturn.push(visa);
    }
  })

  return toReturn;
}

function doTypePaymentMethod(allowed: string): google.payments.api.PaymentMethodType {

  const card:           google.payments.api.PaymentMethodType  = 'CARD';
  const paypal:         google.payments.api.PaymentMethodType  = 'PAYPAL';

  if(allowed === 'CARD')
    return card;

  return paypal;
}

function doTypeTokenization(allowed: string): any {

  const payment_gateway:  string = 'PAYMENT_GATEWAY';
  const direct:           string = 'DIRECT';

  if(allowed === 'PAYMENT_GATEWAY')
    return payment_gateway;

  return direct;
}

function doTotalPriceStatus(allowed: string): google.payments.api.TotalPriceStatus {

  const notc:          google.payments.api.TotalPriceStatus = 'NOT_CURRENTLY_KNOWN';
  const estimated:     google.payments.api.TotalPriceStatus = 'ESTIMATED';
  const final:         google.payments.api.TotalPriceStatus = 'FINAL';

  if(allowed === 'NOT_CURRENTLY_KNOWN')
    return notc;
  if(allowed === 'ESTIMATED')
    return estimated;

  return final;
}
