import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayRequest } from '../payment-request/payRequest';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentService {

  constructor(private http: HttpClient) { }

  payIntent(intentEndpoint: string, payRequest: PayRequest):Observable<any>{
    //the intentEndpoint should be formatted like so: public/{publicId}/payment
    return this.http.put(environment.apiURL+- intentEndpoint, payRequest);
  }
}
