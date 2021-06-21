import { ApplePayJS } from 'projects/ng-wallet/src/lib/apple-pay/applePay';
export class PaymentRequestNGWallet {

  versionAPIApple!:                     number;
  typePaymentMethod!:                   string;
  allowedAuthMethods!:                  string[];
  allowedCardNetworks!:                 string[];
  typeTokenization!:                    string;
  gateway!:                             string
  gatewayMerchantId!:                   string;
  merchantId!:                          string;
  merchantName!:                        string;
  merchantCapabilities!:                string[];
  totalPriceStatus!:                    string;
  totalPriceLabel!:                     string;
  totalPrice!:                          string;
  currencyCode!:                        string;
  countryCode!:                         string;

}

export function doPaymentRequestGoogle(paymentRequest: PaymentRequestNGWallet): google.payments.api.PaymentDataRequest {

  let allowedPaymentMethods:        google.payments.api.PaymentMethodSpecification[] = new Array<google.payments.api.PaymentMethodSpecification>();

  if(doTypePaymentMethod(paymentRequest.typePaymentMethod) === 'CARD') {

    allowedPaymentMethods = [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: doAllowedPaymentAuthMethod(paymentRequest.allowedAuthMethods),
          allowedCardNetworks: doAllowedCardNetworks(paymentRequest.allowedCardNetworks)
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: paymentRequest.gateway,
            gatewayMerchantId: paymentRequest.gatewayMerchantId
          }
        }
      }
    ]

  }

  if(doTypePaymentMethod(paymentRequest.typePaymentMethod) === 'PAYPAL') {

    //do new payment method

  }

  return {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: allowedPaymentMethods,
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

export function doPaymentRequestApple(paymentRequest: PaymentRequestNGWallet): ApplePayJS.ApplePayPaymentRequest {

  return {
            countryCode: paymentRequest.countryCode.toUpperCase(),
            currencyCode: paymentRequest.currencyCode.toUpperCase(),
            supportedNetworks: doAllowedCardNetworksApple(paymentRequest.allowedCardNetworks, paymentRequest.versionAPIApple),
            merchantCapabilities: doMerchantCapabilities(paymentRequest.merchantCapabilities),
            total: {
                label: paymentRequest.totalPriceLabel,
                type: doTotalPriceStatusApple(paymentRequest.totalPriceStatus),
                amount: doTotalPriceApple(paymentRequest.totalPrice, paymentRequest.totalPriceStatus)
            }
          }

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

  const amex:                 google.payments.api.CardNetwork   = 'AMEX';
  const discover:             google.payments.api.CardNetwork   = 'DISCOVER';
  const electron:             google.payments.api.CardNetwork   = 'ELECTRON';
  const elo:                  google.payments.api.CardNetwork   = 'ELO';
  const elo_debit:            google.payments.api.CardNetwork   = 'ELO_DEBIT';
  const interac:              google.payments.api.CardNetwork   = 'INTERAC';
  const jcb:                  google.payments.api.CardNetwork   = 'JCB';
  const maestro:              google.payments.api.CardNetwork   = 'MAESTRO';
  const mastercard:           google.payments.api.CardNetwork   = 'MASTERCARD';
  const visa:                 google.payments.api.CardNetwork   = 'VISA';

  const toReturn:             google.payments.api.CardNetwork[] = new Array<google.payments.api.CardNetwork>();

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

function doAllowedCardNetworksApple(allowed: string[], version: number): string[] {

  const toReturn:     string[] = new Array<string>();

  allowed.forEach(a => {
    if (a === 'AMEX' && version >= 1) {
      toReturn.push('amex');
    }
    if (a === 'DISCOVER' && version >= 1) {
      toReturn.push('discover');
    }
    if (a === 'ELECTRON' && version >= 4) {
      toReturn.push('electron');
    }
    if (a === 'ELO' && version >= 5) {
      toReturn.push('elo');
    }
    if (a === 'INTERAC' && version >= 1) {
      toReturn.push('interac');
    }
    if (a === 'JCB' && version >= 2) {
      toReturn.push('jcb');
    }
    if (a === 'MAESTRO' && version >= 4) {
      toReturn.push('maestro');
    }
    if (a === 'MASTERCARD' && version >= 1) {
      toReturn.push('masterCard');
    }
    if (a === 'VISA' && version >= 1) {
      toReturn.push('visa');
    }
    if (a === 'CARTES_BANCAIRES' && version >= 4) {
      toReturn.push('cartesBancaires');
    }
    if (a === 'CHINA_UNION_PAY' && version >= 1) {
      toReturn.push('chinaUnionPay');
    }
    if (a === 'EFTPOS' && version >= 4) {
      toReturn.push('eftpos');
    }
    if (a === 'MADA' && version >= 5) {
      toReturn.push('mada');
    }
    if (a === 'PRIVATE_LABEL' && version >= 1) {
      toReturn.push('privateLabel');
    }
    if (a === 'VPAY' && version >= 4) {
      toReturn.push('vPay');
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

function doTotalPriceStatusApple(allowed: string): string {

  if(allowed === 'PENDING')
    return 'pending';

  return 'final';
}

function doMerchantCapabilities(allowed: string[]): string[] {

  const toReturn:             string[] = new Array<string>();

  allowed.forEach(a => {
    if (a === 'SUPPORTS_3DS') {
      toReturn.push('supports3DS');
    }
    if (a === 'SUPPORTS_EMV') {
      toReturn.push('supportsEMV');
    }
    if (a === 'SUPPORTS_Credit') {
      toReturn.push('supportsCredit');
    }
    if (a === 'SUPPORTS_Debit') {
      toReturn.push('supportsDebit');
    }
  })

  return toReturn;
}

function doTotalPriceApple(allowed: string, totalPriceStatus: string): string {

  if(totalPriceStatus === 'PENDING')
    return 'pending';

  return allowed;
}
