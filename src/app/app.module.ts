import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { BoatsRoutingModule } from './boats/boats-routing.module';
import { BoatsModule } from './boats/boats.module';
import { TokenInterceptorInterceptor } from './core/shared/token-interceptor.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
