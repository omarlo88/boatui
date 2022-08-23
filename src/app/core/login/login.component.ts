import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/model/user';

@Component({
  selector: 'baot-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  /**
   * Constructor of LoginComponent.
   *
   * @param: router
   * @param: authService
   * @param: msgService
   */
  constructor(private router: Router,
              private authService: AuthService,
              private msgService: MessageService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl<string | null>('', Validators.required),
      password: new FormControl<string | null>('', Validators.required)
    })
  }

  login(event: MouseEvent): void {
    if (event) {
      const formData = this.loginForm.value;
      this.authService.login(formData)
      .subscribe({
        next: (data: User) => {
          if (data && data.id) {
            this.authService.next(data);
            this.router.navigate(['/boats']);
          } else {
            this._getMessageLoginFail();
          }
        },
        error: err => {
          console.log(err);
          this._getMessageLoginFail();
        }
      })
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
  }

  private _getMessageLoginFail(): void {
    const msg = {
      severity: 'error',
      summary: 'Login..',
      detail: 'Not authorize. Please your administrator'
    };

    this.msgService.add(msg);
  }

  ngOnDestroy(): void {
    this.loginForm.reset();
  }
}
