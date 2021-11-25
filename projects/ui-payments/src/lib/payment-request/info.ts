import { Discount } from './discount';
import { Item } from './item';
import { Tax } from './tax';

export class Info {
  id?: string;
  // Items
  items?:             Item[];

  // Sub-total
  subTotalPrice?:     string;

  // Tax
  taxes?:             Tax[];
  tax?:               number;
  taxRate?:           number;
  taxRateScale?:      number;

  // Discount
  discount?:          Discount;

  totalPriceStatus!:  string;
  totalPriceLabel!:   string;
  totalPrice!:        string;
  currencyCode!:      string;
  countryCode!:       string;

}
