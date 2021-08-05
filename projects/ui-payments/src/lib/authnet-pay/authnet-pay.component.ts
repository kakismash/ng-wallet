import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthPaymentService } from '../service/auth-payment.service';
import { PayRequest } from '../payment-request/payRequest';

@Component({
  selector: 'authnet-pay',
  templateUrl: './authnet-pay.component.html',
  styleUrls: ['./authnet-pay.component.scss']
})
export class AuthNetPayComponent {

  calls: number = 0;
  callMade:         boolean = false;

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
      this.calls+=1;
      console.log(event.data);

      if (event.data.pktData.messages.resultCode === "Error"){

        window.alert(event.data.pktData.messages.message[0].text);
        this.paymentFail.emit(JSON.stringify({message: 'failed', errorType: event.data.pktData.messages.message[0].text}))

      }else if (event.data.pktData.messages.resultCode === "Ok"){

        payment.token = event.data.pktData.opaqueData.dataValue;
        payment.source = event.data.pktData.opaqueData.dataDescriptor;

        console.log('Number of calls: ' + this.calls);

        for (var i=0; i<this.calls; i++) {

          if (i < 1 && this.callMade === false) {

            this.submitForm();

          } else if (i === this.calls){
            this.calls = 0;
            console.log('LAST CALL REACHED, RESET AND ERROR');

          }

        }

      }
    }

  }

  submitForm(): void {
    console.log('FIRST CALL REACHED');
    this.callMade = true;
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

  resetCallMade(): void {
    this.callMade = false;
  }

}
