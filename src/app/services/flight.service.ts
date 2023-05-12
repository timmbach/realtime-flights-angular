import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IFlight } from '../models/flight.model';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  public serverUrl = 'https://opensky-network.org/api';

  constructor(private http: HttpClient) {}

  getFlights(beginTime: number, endTime: number): Observable<IFlight[]> {
    let dataUrl = `${this.serverUrl}/flights/all?begin=${beginTime}&end=${endTime}`;

    return this.http
      .get<IFlight[]>(dataUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage =
        'Error fetching flights from server. There is no active flight information available for the specified time range. Try adjusting the time range and ensure both times are not more than 1 hour apart';
    }

    console.log(errorMessage);

    return throwError(() => {
      return errorMessage;
    });
  }
}
