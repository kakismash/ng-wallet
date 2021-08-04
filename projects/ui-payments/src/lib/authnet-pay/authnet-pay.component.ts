import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthPaymentService } from '../service/auth-payment.service';
import { PayRequest } from '../payment-request/payRequest';

@Component({
  selector: 'authnet-pay',
  templateUrl: './authnet-pay.component.html',
  styleUrls: ['./authnet-pay.component.scss']
})
export class AuthNetPayComponent {

  calls:            number = 0;

  @Input() publicKey!:    string;
  @Input() apiLoginId?:   string;
  @Input() clientKey?:    string;
  @Input() payRequest:       PayRequest = new PayRequest();
  @Input() buttonColor!:  string;
  @Input() timer!:        number;

  @Output() paymentSuccess:         EventEmitter<any> = new EventEmitter();
  @Output() paymentFail:            EventEmitter<any> = new EventEmitter();

  constructor(private paymentService: AuthPaymentService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    window.addEventListener('message', (event)=>{
      this.paymentHandler(event, this.payRequest);
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
        this.submitForm();

      }
    }

  }

  submitForm(): void {
    if(this.calls< 1){
      this.calls++;
      this.paymentService
          .sendPaymentAuthNet('public/'+this.publicKey+'/payment', this.payRequest)
          .subscribe({
            next: (resp=>
              {
                console.log('AUTH.NET PAYMENT SUCCESS: '+resp);
                this.paymentSuccess.emit(resp);
              }),
            error:(err=>{
              this.paymentFail.emit(err);
            })});
    }else{
      console.log('TWO CALLS ARE PROHIBITED');
    }
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
