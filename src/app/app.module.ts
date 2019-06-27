import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { WINDOW_PROVIDERS } from '@core/window.provider';
import { EVENT_END_PROVIDER } from '@core/event-end';

import { AppComponent } from './app.component';
import { NavbarComponent } from '@view/navbar/navbar.component';
import { SidebarComponent } from '@view/sidebar/sidebar.component';
import { WrapperComponent } from '@view/sidebar/wrapper/wrapper.component';

import { ScrollbarDirective } from '@shared/directives/scrollbar/scrollbar.directive';
import { WrapperDirective } from '@shared/directives/wrapper/wrapper.directive';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as iconPack from '@core/fortawesome-icons';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ScrollbarDirective,
    WrapperDirective,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    EVENT_END_PROVIDER
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {
    library.add(iconPack);
  }
}
