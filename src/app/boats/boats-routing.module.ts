import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatsComponent } from './boats/boats.component';

const routes: Routes = [
  {
    path: '', component: BoatsComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoatsRoutingModule { }
