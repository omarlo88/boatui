import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './core/shared/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'boats',
    loadChildren: () => import('./boats/boats.module').then(m => m.BoatsModule),
    canLoad: [ AuthGuard ]
  },
  { path: '', redirectTo: '/boats', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
