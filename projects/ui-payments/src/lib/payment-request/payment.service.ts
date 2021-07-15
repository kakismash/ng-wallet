import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayRequest } from './payRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiURL :string = 'http://localhost:8081/'


  constructor(private http: HttpClient) { }

  sendPayment(endpoint: string, payment: PayRequest): Observable<PayRequest> {
    return this.http.post<PayRequest>(this.apiURL + endpoint, payment);
  }

}
