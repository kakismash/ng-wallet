import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayRequest } from '../payment-request/payRequest';
import { environment } from '../environments/environments';
import { IntentResponse } from '../payment-request/intentResponse';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentService {

  constructor(private http: HttpClient) { }

  // payIntent(intentEndpoint: string, payRequest: PayRequest):Observable<any>{
  //   //the intentEndpoint should be formatted like so: public/{publicId}/payment
  //   return this.http.put(environment.apiURL+ intentEndpoint, payRequest);
  // }

  payIntent(
    publicId: string,
    request: PayRequest): Observable<IntentResponse> {

    return this.http
          .put<IntentResponse>(environment.apiURL + 'public/' + publicId + '/payment',
                              request);
  }

}
