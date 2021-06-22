import { Item } from './item';
import { Tax } from './tax';

export class Info {

  items?:             Item[];

  // Sub-total
  subTotalPrice!:     string;

  // Tax
  taxes!:             Tax[];

  totalPriceStatus!:  string;
  totalPriceLabel!:   string;
  totalPrice!:        string;
  currencyCode!:      string;
  countryCode!:       string;

}
