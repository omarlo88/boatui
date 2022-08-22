import { Component, OnDestroy, OnInit } from '@angular/core';
import { flagFranceBase64 } from '../shared/flagFr';
import { AuthService } from '../../core/shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'baot-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarId: string;
  urlFr = flagFranceBase64;

  userEventsSubscription: Subscription;
  loggedUser = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userEventsSubscription = this.authService.getCurrentUserProfileEvent().subscribe((user) => this.loggedUser = user);
  }

  switchLogin(): void {

  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }
}
