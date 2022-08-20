import { NgModule } from '@angular/core';

import { BoatsRoutingModule } from './boats-routing.module';
import { BoatsComponent } from './boats/boats.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BoatsComponent
  ],
  imports: [
    BoatsRoutingModule,
    SharedModule
  ]
})
export class BoatsModule { }
