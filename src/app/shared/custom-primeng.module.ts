import { NgModule } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  imports: [
    ToastModule,
    TableModule,
    TooltipModule
  ],
  exports:[
    ToastModule,
    TableModule,
    TooltipModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class CustomPrimengModule { }
