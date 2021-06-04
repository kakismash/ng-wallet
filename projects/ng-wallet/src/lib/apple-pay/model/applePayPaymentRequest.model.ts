import { ApplePayShippingMethod } from './applePayShippingMethod.model';
import { ApplePayLineItem } from './applePayLineItem.model';
import { ApplePayPaymentContact } from './applePayPaymentContact.model';
import { ApplePayContactField } from './applePayContactField.model';


export type ApplePayMerchantCapability = 'supports3DS' | 'supportsEMV' | 'supportsCredit' | 'supportsDebit';
export type ApplePayShippingType       = 'shipping'    | 'delivery'    | 'storePickup'    | 'servicePickup';


export class ApplePayPaymentRequest {
  merchantCapabilities!:              Array<ApplePayMerchantCapability>;
  supportedNetworks!:                 string[];
  countryCode!:                       string;
  requiredBillingContactFields?:      Array<ApplePayContactField> ;
  billingContact?:                    ApplePayPaymentContact;
  requiredShippingContactFields?:     Array<ApplePayContactField> ;
  shippingContact?:                   ApplePayPaymentContact ;
  applicationData?:                   string;
  supportedCountries?:                string[];
  total!:                             ApplePayLineItem;
  lineItems?:                         Array<ApplePayLineItem>;
  currencyCode!:                      string;
  shippingType?:                      ApplePayShippingType;
  shippingMethods?:                   Array<ApplePayShippingMethod>;

}
