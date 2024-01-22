import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardLoadingComponent } from './utilities/card-loading/card-loading.component';
import { CardSerieComponent } from './utilities/card-serie/card-serie.component';
@NgModule({
  declarations: [
    AppComponent,
    CardLoadingComponent,
    CardSerieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
