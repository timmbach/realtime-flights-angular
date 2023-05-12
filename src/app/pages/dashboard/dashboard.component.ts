import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { FlightService } from 'src/app/services/flight.service';
import { IFlight } from 'src/app/models/flight.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public userEmail: string | null | undefined = '';

  fromDateControl = new FormControl<string>('');
  toDateControl = new FormControl<string>('');

  // string values of dates
  public fromDateTimeString: Date | null = null;
  public toDateTimeString: Date | null = null;

  // begin time and end time in number format as required by the API
  public beginTime: number = 0;
  public endTime: number = 0;

  // flights information from API
  public loading: boolean = false;
  public flights: IFlight[] = [];
  public errorMessage: string | null = null;

  constructor(
    private _auth: AngularFireAuth,
    private _authService: AuthService,
    private _flightService: FlightService,
    private router: Router
  ) {}

  // public startDate: string = '';

  ngOnInit(): void {
    this._auth.onAuthStateChanged((user) => {
      this.userEmail = user?.email;
    });
  }

  handleDateSubmit() {
    this.errorMessage = null;
    this.loading = true;
    const fromDateTime = this.fromDateControl.value;
    const toDateTime = this.toDateControl.value;
    if (toDateTime && fromDateTime) {
      this.fromDateTimeString = new Date(fromDateTime);
      this.toDateTimeString = new Date(toDateTime);

      this.beginTime = Math.round(
        new Date(this.fromDateTimeString)[Symbol.toPrimitive]('number') / 1000
      );
      this.endTime = Math.round(
        new Date(this.toDateTimeString)[Symbol.toPrimitive]('number') / 1000
      );

      this._flightService.getFlights(this.beginTime, this.endTime).subscribe(
        (data) => {
          this.flights = data;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error;
        }
      );
    }
  }

  logout() {
    this._authService
      .logout()
      .then(
        () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        (err) => {
          this.errorMessage = err.message;
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }
}
