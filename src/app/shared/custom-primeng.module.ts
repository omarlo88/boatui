import { NgModule } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@NgModule({
  imports: [
    ToastModule
  ],
  exports:[
    ToastModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class CustomPrimengModule { }
