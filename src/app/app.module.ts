import { TuiRootModule ,TuiButtonModule,TuiDataListModule,TuiHostedDropdownModule } from "@taiga-ui/core"; 
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './screens/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      TuiRootModule,TuiButtonModule,TuiDataListModule,TuiHostedDropdownModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
