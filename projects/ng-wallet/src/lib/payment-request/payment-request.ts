import { Discount } from './discount';
import { Item } from './item';
import { DisplayItem } from './display-item';
import { ApplePayJS } from '../apple-pay/applePay';
import { Info } from './info';
import { Tax } from './tax';

export class PaymentRequestNGWallet {

  // Version API
  versionAPIApple!:                     number;

  // Payment Method
  typePaymentMethod!:                   string;
  allowedAuthMethods!:                  string[];
  allowedCardNetworks!:                 string[];

  // Merchant and Gateway
  typeTokenization!:                    string;
  gateway!:                             string
  gatewayMerchantId!:                   string;
  merchantId!:                          string;
  merchantName!:                        string;
  appleMerchant!:                       string;
  merchantCapabilities!:                string[];

  // List Itmes (label, type and price)
  listItems?:                           DisplayItem[];

  // Final Price
  info!:                                Info;
}

export function doPaymentRequestGoogle(paymentRequest: PaymentRequestNGWallet): google.payments.api.PaymentDataRequest {

  let allowedPaymentMethods:        google.payments.api.PaymentMethodSpecification[] = new Array<google.payments.api.PaymentMethodSpecification>();

  if (doTypePaymentMethod(paymentRequest.typePaymentMethod) === 'CARD') {

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

  if (doTypePaymentMethod(paymentRequest.typePaymentMethod) === 'PAYPAL') {

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
      displayItems: doDisplayItems(paymentRequest.info),
      totalPriceStatus: doTotalPriceStatus(paymentRequest.info.totalPriceStatus),
      totalPriceLabel: paymentRequest.info.totalPriceLabel,
      totalPrice: paymentRequest.info.totalPrice,
      currencyCode: paymentRequest.info.currencyCode.toUpperCase(),
      countryCode: paymentRequest.info.countryCode.toUpperCase()
    }
  }
}

export function doPaymentRequestApple(paymentRequest: PaymentRequestNGWallet): ApplePayJS.ApplePayPaymentRequest {
  return {
    countryCode: paymentRequest.info.countryCode.toUpperCase(),
    currencyCode: paymentRequest.info.currencyCode.toUpperCase(),
    supportedNetworks: doAllowedCardNetworksApple(paymentRequest.allowedCardNetworks, paymentRequest.versionAPIApple),
    merchantCapabilities: doMerchantCapabilities(paymentRequest.merchantCapabilities),
    lineItems: doLineItems(paymentRequest.info),
    total: {
      label: paymentRequest.info.totalPriceLabel,
      type: doTotalPriceStatusApple(paymentRequest.info.totalPriceStatus),
      amount: paymentRequest.info.totalPrice
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
    else if (a === 'CRYPTOGRAM_3DS') {
      toReturn.push(crypto);
    }
  })

  return toReturn;
}

function doAllowedCardNetworks(allowed: string[]): google.payments.api.CardNetwork[] {

  const toReturn:             google.payments.api.CardNetwork[] = new Array<google.payments.api.CardNetwork>();

  allowed.forEach(a => {
    switch (a) {
      case 'AMEX':
        toReturn.push('AMEX');
        break;
      case 'DISCOVER':
        toReturn.push('DISCOVER');
        break;
      case 'ELECTRON':
        toReturn.push('ELECTRON');
        break;
      case 'ELO':
        toReturn.push('ELO');
        break;
      case 'ELO_DEBIT':
        toReturn.push('ELO_DEBIT');
        break;
      case 'INTERAC':
        toReturn.push('INTERAC');
        break;
      case 'JCB':
        toReturn.push('JCB');
        break;
      case 'MAESTRO':
        toReturn.push('MAESTRO');
        break;
      case 'MASTERCARD':
        toReturn.push('MASTERCARD');
        break;
      case 'VISA':
        toReturn.push('VISA')
        break;
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
    else if (a === 'DISCOVER' && version >= 1) {
      toReturn.push('discover');
    }
    else if (a === 'ELECTRON' && version >= 4) {
      toReturn.push('electron');
    }
    else if (a === 'ELO' && version >= 5) {
      toReturn.push('elo');
    }
    else if (a === 'INTERAC' && version >= 1) {
      toReturn.push('interac');
    }
    else if (a === 'JCB' && version >= 2) {
      toReturn.push('jcb');
    }
    else if (a === 'MAESTRO' && version >= 4) {
      toReturn.push('maestro');
    }
    else if (a === 'MASTERCARD' && version >= 1) {
      toReturn.push('masterCard');
    }
    else if (a === 'VISA' && version >= 1) {
      toReturn.push('visa');
    }
    else if (a === 'CARTES_BANCAIRES' && version >= 4) {
      toReturn.push('cartesBancaires');
    }
    else if (a === 'CHINA_UNION_PAY' && version >= 1) {
      toReturn.push('chinaUnionPay');
    }
    else if (a === 'EFTPOS' && version >= 4) {
      toReturn.push('eftpos');
    }
    else if (a === 'MADA' && version >= 5) {
      toReturn.push('mada');
    }
    else if (a === 'PRIVATE_LABEL' && version >= 1) {
      toReturn.push('privateLabel');
    }
    else if (a === 'VPAY' && version >= 4) {
      toReturn.push('vPay');
    }
  })

  return toReturn;
}

function doTypePaymentMethod(allowed: string): google.payments.api.PaymentMethodType {

  let toReturn:         google.payments.api.PaymentMethodType  = 'CARD';

  if (allowed === 'PAYPAL') {
    toReturn = 'PAYPAL';
  }

  return toReturn;
}

function doTotalPriceStatus(allowed: string): google.payments.api.TotalPriceStatus {

  let toReturn:        google.payments.api.TotalPriceStatus = 'FINAL';

  if (allowed === 'NOT_CURRENTLY_KNOWN') {
    toReturn = 'NOT_CURRENTLY_KNOWN';
  }
  else if (allowed === 'ESTIMATED') {
    toReturn =  'ESTIMATED';
  }

  return toReturn;
}

function doTotalPriceStatusApple(allowed: string): string {

  let toReturn:           string = 'final';

  if (allowed === 'PENDING'){
    toReturn = 'pending';
  }

  return toReturn;
}

function doMerchantCapabilities(allowed: string[]): string[] {

  const toReturn:             string[] = new Array<string>();

  allowed.forEach(a => {
    if (a === 'SUPPORTS_3DS') {
      toReturn.push('supports3DS');
    }
    else if (a === 'SUPPORTS_EMV') {
      toReturn.push('supportsEMV');
    }
    else if (a === 'SUPPORTS_CREDIT') {
      toReturn.push('supportsCredit');
    }
    else if (a === 'SUPPORTS_DEBIT') {
      toReturn.push('supportsDebit');
    }
  })

  if (!toReturn.some(a => a === 'supports3DS') {
    toReturn.push('supports3DS');
  }

  return toReturn;
}

function doDisplayItems(info: Info): google.payments.api.DisplayItem[] {

  const displayItems: google.payments.api.DisplayItem[] = [];

  if (info.subTotalPrice !== undefined) {
    displayItems.push(doSubTotal(info.subTotalPrice));
  }

  if (info.taxes !== undefined) {
    info.taxes.forEach(t => {
      displayItems.push(doTax(t))
    })
  }

  if (info.items !== undefined) {
    info.items.forEach(i => {
      displayItems.push(...doItem(i))
    })
  }

  if (info.discont !== undefined) {
    displayItems.push(doDiscount(info.discont));
  }

  return displayItems;
}

function doSubTotal(subTotalAmount: string): google.payments.api.DisplayItem {
  return {
    label: 'SUBTOTAL',
    price: subTotalAmount,
    type: 'SUBTOTAL'
  };
}

function doTax(tax: Tax): google.payments.api.DisplayItem {
  return {
    label: tax.label,
    price: tax.amount,
    type: 'TAX'
  };
}

function doItem(item: Item): google.payments.api.DisplayItem[] {
  const items: google.payments.api.DisplayItem[] = [];
  const i:     google.payments.api.DisplayItem = {
    label:     item.label,
    price:     item.price,
    type:      'LINE_ITEM'
  };

  for(let a = 0; a < item.quantity; a++) {
    items.push(i);
  }

  return items;
}

function doLineItems(info: Info): ApplePayJS.ApplePayLineItem[] {

  const lineItems: ApplePayJS.ApplePayLineItem[] = [];

  if (info.subTotalPrice !== undefined) {
    lineItems.push(doSubTotalApple(info.subTotalPrice));
  }

  if (info.taxes !== undefined) {
    info.taxes.forEach(t => {
      lineItems.push(doTaxApple(t))
    })
  }

  if (info.items !== undefined) {
    info.items.forEach(i => {
      lineItems.push(...doItemApple(i))
    })
  }

  if (info.discont !== undefined) {
    lineItems.push(doDiscountApple(info.discont))
  }

  return lineItems;
}

function doDiscount(discount: Discount): google.payments.api.DisplayItem {
  return {
    label: discount.label,
    price: discount.amount,
    type: 'DISCOUNT'
  };
}

function doSubTotalApple(subTotalAmount: string): ApplePayJS.ApplePayLineItem {
  return {
    label: 'SUBTOTAL',
    amount: subTotalAmount,
    type: 'final'
  };
}

function doTaxApple(tax: Tax): ApplePayJS.ApplePayLineItem {
  return {
    label: tax.label,
    amount: tax.amount,
    type: 'final'
  };
}

function doItemApple(item: Item): ApplePayJS.ApplePayLineItem[] {
  const items: ApplePayJS.ApplePayLineItem[]  = [];
  const i:     ApplePayJS.ApplePayLineItem    = {
    label:     item.label,
    amount:    item.price,
    type:      'final'
  };

  for(let a = 0; a < item.quantity; a++) {
    items.push(i);
  }

  return items;
}

function doDiscountApple(discount: Discount): ApplePayJS.ApplePayLineItem {
  return {
    label: discount.label,
    amount: discount.amount,
    type: 'final'
  };
}
