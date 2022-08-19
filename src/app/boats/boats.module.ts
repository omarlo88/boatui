import { NgModule } from '@angular/core';

import { BoatsRoutingModule } from './boats-routing.module';
import { BoatsComponent } from './boats/boats.component';


@NgModule({
  declarations: [
    BoatsComponent
  ],
  imports: [
    BoatsRoutingModule
  ]
})
export class BoatsModule { }
