import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    ClipboardModule,
    SwiperModule,
  ]
})
export class InfoModule { }
