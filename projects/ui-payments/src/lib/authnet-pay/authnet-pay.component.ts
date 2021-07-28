import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthPaymentService } from '../service/auth-payment.service';
import { PayRequest } from '../payment-request/payRequest';

@Component({
  selector: 'authnet-pay',
  templateUrl: './authnet-pay.component.html',
  styleUrls: ['./authnet-pay.component.scss']
})
export class AuthNetPayComponent {

  cardEntered:            boolean = false;

  @Input() publicKey!:    string;
  @Input() apiLoginId?:   string;
  @Input() clientKey?:    string;
  @Input() payment:       PayRequest = new PayRequest();
  @Input() buttonColor!:  string;
  @Input() timer!:        number;

  @Output() paymentSuccess:         EventEmitter<string> = new EventEmitter();
  @Output() paymentFail:            EventEmitter<string> = new EventEmitter();

  constructor(private paymentService: AuthPaymentService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

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
        this.cardEntered = true;

      }
    }

  }

  submitForm(): void {

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
            this.cardEntered = false;
          })});
  }

  dismissFormTimer(): void {

    let acceptEl = document.getElementById('AcceptUIContainer');
    let acceptBackground = document.getElementById('AcceptUIBackground');

    if(acceptEl && this.timer){

      window.setTimeout(()=>{

        acceptEl?.remove();
        acceptBackground?.remove();

      }, this.timer);

    }
  }

}
