import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // authorized = false;
  display = false;

  versionApp = environment.version;
  yearApp = environment.year;

  ngOnInit(): void {
    this.display = true;
  }

  ngOnDestroy(): void {
    this.display = false;
  }
}
