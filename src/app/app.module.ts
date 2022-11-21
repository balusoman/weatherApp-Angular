import { TuiRootModule ,TuiButtonModule,TuiDataListModule,TuiHostedDropdownModule } from "@taiga-ui/core"; 
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
// import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './screens/pagenotfound/pagenotfound.component';
import { CommonModule } from "@angular/common"; 



@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent, 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
   
   
    
      BrowserAnimationsModule, 
      TuiRootModule,TuiButtonModule,TuiDataListModule,TuiHostedDropdownModule
],
  providers: [
     
  ],
  bootstrap: [AppComponent],
  schemas:  [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
