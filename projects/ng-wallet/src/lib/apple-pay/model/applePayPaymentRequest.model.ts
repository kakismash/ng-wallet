class ApplePayPaymentRequest {

  required sequence <ApplePayMerchantCapability> merchantCapabilities;
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
