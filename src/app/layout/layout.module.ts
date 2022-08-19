import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    DropdownModule,
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
