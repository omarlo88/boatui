import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPrimengModule } from './custom-primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomPrimengModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    CustomPrimengModule
  ]
})
export class SharedModule { }
