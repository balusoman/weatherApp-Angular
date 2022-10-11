import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaigaUiModule } from './../../../shared/taiga-ui/taiga-ui.module';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TaigaUiModule
  ]
})
export class DashboardModule { }
