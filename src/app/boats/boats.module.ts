import { NgModule } from '@angular/core';

import { BoatsRoutingModule } from './boats-routing.module';
import { BoatsComponent } from './boats/boats.component';
import { SharedModule } from '../shared/shared.module';
import { CurrencyPipe } from '@angular/common';
import { BoatFormComponent } from './boats/boat-form/boat-form.component';


@NgModule({
  declarations: [
    BoatsComponent,
    BoatFormComponent
  ],
  imports: [
    BoatsRoutingModule,
    SharedModule,
    CurrencyPipe
  ]
})
export class BoatsModule { }
