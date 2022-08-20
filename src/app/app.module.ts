import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { BoatsRoutingModule } from './boats/boats-routing.module';
import { BoatsModule } from './boats/boats.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BoatsRoutingModule,
    AppRoutingModule,
    LayoutModule,
    CoreModule,
    BoatsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
