import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayRequest } from '../payment-request/payRequest';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthPaymentService {

  constructor(private http: HttpClient) { }

  sendPaymentAuthNet(endpoint: string, payRequest: PayRequest): Observable<PayRequest> {
    return this.http.post<PayRequest>(environment.apiURL + endpoint, payRequest);
  }
}
