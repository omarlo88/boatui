import { Component, OnDestroy, OnInit } from '@angular/core';
import { flagFranceBase64 } from '../shared/flagFr';
import { AuthService } from '../../core/shared/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../core/shared/model/user';

@Component({
  selector: 'baot-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarId: string;
  urlFr = flagFranceBase64;

  userEventsSubscription: Subscription;
  loggedUser = null;

  get currentUser(): User {
    return this.loggedUser;
  }

  set currentUser(value: User) {
    this.loggedUser = value;
  }

  /**
   * Constructor of HeaderComponent.
   *
   * @param: authService
   */
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userEventsSubscription = this.authService.getCurrentUserProfileEvent().subscribe((user) => this.currentUser = user);
  }

  switchLogin(): void {

  }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }
}
