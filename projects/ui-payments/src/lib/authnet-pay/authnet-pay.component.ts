import { Component } from '@angular/core';
import { PaymentService } from '../payment-request/payment.service';
import { PayRequest } from '../payment-request/payRequest';

@Component({
  selector: 'authnet-pay',
  templateUrl: './authnet-pay.component.html',
  styleUrls: ['./authnet-pay.component.scss']
})
export class AuthNetPayComponent {

  apiLoginId="5dJ6eN8V";
  clientKey="9Q25f799AVFeY4j2d2hJ29C253q2BJrLKet2uJPhaQVnL9KG7Jdcb8jrGhuGEvbR";
  payRequest: PayRequest = new PayRequest();

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.payRequest = new PayRequest();
    this.payRequest.amount = 123.55;
    this.payRequest.email = 'cesarmejia-aquino@ordyx.com';
    this.payRequest.tip = 10;
    this.payRequest.source = 'card';
    this.payRequest.token ='';
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    window.addEventListener('message', (event)=>{
      this.paymentHandler(event, this.payRequest);
    }
    , false);
  }

  paymentHandler(event: any, payment: PayRequest): void {

    if(event.data.type === 'RESPONSE'){
      console.log(event.data);
      if(event.data.pktData.messages.resultCode === "Error"){
        console.log(event.data.pktData.messages);
      }else if(event.data.pktData.messages.resultCode === "Ok"){
        console.log("Ok")
      }
      payment.token = event.data.pktData.opaqueData.dataValue;
      payment.source = event.data.pktData.opaqueData.dataDescriptor;
    }

  }

  submitForm(): void {
    console.log(this.payRequest);
    this.paymentService
        .sendPayment('public/0e2455c4-5b48-11eb-b74a-0a5121788669/payment', this.payRequest)
        .subscribe({next: (resp=>{console.log(resp)}),
                    error:(err=>console.log(err))});
  }

}
