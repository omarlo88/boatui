import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  imports: [
    ToastModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    InputNumberModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
  ],
  exports:[
    ToastModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    InputNumberModule,
    ProgressSpinnerModule,
    ConfirmDialogModule
  ]
})
export class CustomPrimengModule { }
