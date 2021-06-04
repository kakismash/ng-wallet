export type ApplePayMerchantCapability = 'supports3DS' | 'supportsEMV' | 'supportsCredit' | 'supportsDebit';

export class ApplePayPaymentRequest {
  merchantCapabilities?: Array<ApplePayMerchantCapability>;
  required sequence <DOMString> supportedNetworks;
  required DOMString countryCode;
  sequence <ApplePayContactField> requiredBillingContactFields;
  ApplePayPaymentContact billingContact;
  sequence <ApplePayContactField> requiredShippingContactFields;
  ApplePayPaymentContact shippingContact;
  DOMString applicationData;
  sequence <DOMString> supportedCountries;
  required ApplePayLineItem total;
  sequence <ApplePayLineItem> lineItems;
  required DOMString currencyCode;
  ApplePayShippingType shippingType;
  sequence <ApplePayShippingMethod> shippingMethods;

}
