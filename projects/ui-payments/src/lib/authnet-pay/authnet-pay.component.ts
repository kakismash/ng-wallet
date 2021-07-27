import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthPaymentService } from '../service/auth-payment.service';
import { PayRequest } from '../payment-request/payRequest';

@Component({
  selector: 'authnet-pay',
  templateUrl: './authnet-pay.component.html',
  styleUrls: ['./authnet-pay.component.scss']
})
export class AuthNetPayComponent {

  @Input() publicKey!:    string;
  @Input() apiLoginId?:   string;
  @Input() clientKey?:    string;
  @Input() payment:       PayRequest = new PayRequest();

  @Output() paymentSuccess:         EventEmitter<string> = new EventEmitter();
  @Output() paymentFail:            EventEmitter<string> = new EventEmitter();

  constructor(private paymentService: AuthPaymentService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.payment = new PayRequest();
    // this.payment.amount = 123.55;
    // this.payment.email = 'cesarmejia-aquino@ordyx.com';
    // this.payment.tip = 10;
    // this.payment.source = 'card';
    // this.payment.token ='';
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    window.addEventListener('message', (event)=>{
      this.paymentHandler(event, this.payment);
    }
    , false);
  }

  paymentHandler(event: any, payment: PayRequest): void {

    if(event.data.type === 'RESPONSE'){
      console.log(event.data);

      if(event.data.pktData.messages.resultCode === "Error"){

        window.alert(event.data.pktData.messages.message[0].text);
        this.paymentFail.emit(JSON.stringify({message: 'failed', errorType: event.data.pktData.messages.message[0].text}))

      }else if(event.data.pktData.messages.resultCode === "Ok"){

        payment.token = event.data.pktData.opaqueData.dataValue;
        payment.source = event.data.pktData.opaqueData.dataDescriptor;

      }
    }

  }

  submitForm(): void {
    console.log(this.payment);

    this.paymentService
        .sendPaymentAuthNet('public/'+this.publicKey+'/payment', this.payment)
        .subscribe({
          next: (resp=>
            {
              console.log('AUTH.NET PAYMENT SUCCESS: '+resp);
              this.paymentSuccess.emit('Success');
            }),
          error:(err=>{
            console.log('AUTH.NET PAYMENT ERROR: '+err);
            this.paymentFail.emit(JSON.stringify({message: 'failed', errorType: err.error}));
          })});
  }
}
