import { Component } from '@angular/core';

@Component({
  selector: 'authnet-pay',
  templateUrl: './authnet-pay.component.html',
  styleUrls: ['./authnet-pay.component.scss']
})
export class AuthNetPayComponent {

  paymentForm = document.getElementById('paymentForm');
  authnetBtn = document.getElementById('authnet');
  apiLoginId="5dJ6eN8V";
  clientKey="9Q25f799AVFeY4j2d2hJ29C253q2BJrLKet2uJPhaQVnL9KG7Jdcb8jrGhuGEvbR";

  constructor() {}

  responseHandler(event: any): void {
    console.log(event);
    this.paymentForm?.addEventListener('change', (data) => {
      this.paymentFormUpdate(data);
    });
    this.authnetBtn?.addEventListener('message', (data)=>{
      this.paymentFormUpdate(data);
    });
  }

  paymentFormUpdate(opaqueData: any): void {
    console.log(opaqueData);
  }
}
