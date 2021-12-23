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

  send(endpoint: string, payRequest: PayRequest): Observable<any> {
    return this.http.post<any>(environment.apiURL + endpoint, payRequest);
  }

  requestMerchantSession(publicId: string): Observable<any>{
    return this.http.post<any>(environment.apiURL+'public/'+publicId+'/payment/applePay', {});
  }
}
