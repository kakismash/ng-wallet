import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-wallet';

  private acceptedCardTypes: string[] = ['AMEX', 'VISA', 'MASTERCARD', 'DISCOVER', 'ELECTRON', 'ELO', 'ELO_DEBIT', 'INTERAC', 'JCB', 'MAESTRO'];
  cardTypes: string[] = [];

  constructor() {
    this.defaultCardTypes();
  }

  defaultCardTypes(): void {
    this.cardTypes = [];
    this.cardTypes.push('VISA');
    this.cardTypes.push('MASTERCARD');
  }

  assignCardTypes(values: string[]) {
    values.forEach(v => {
      if (this.isAcceptedCardType(v) && !this.isAlreadyCardType(v)) {
        this.cardTypes.push(v);
      }
    });
  }

  private isAcceptedCardType(value: string): boolean {
    return this.acceptedCardTypes.includes(value);
  }

  private isAlreadyCardType(value: string): boolean {
    return this.cardTypes.includes(value);
  }

}
