import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-wallet';

  cardNertwork: string[] = ['AMEX', 'VISA', 'MASTERCARD', 'DISCOVER', 'ELECTRON', 'ELO', 'ELO_DEBIT', 'INTERAC', 'JCB', 'MAESTRO'];
}
