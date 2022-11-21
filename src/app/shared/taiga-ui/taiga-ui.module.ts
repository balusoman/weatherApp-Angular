import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiLoaderModule,TuiThemeNightModule, TuiModeModule,TuiDataListModule,TuiCalendarModule,TuiLabelModule} from '@taiga-ui/core';
import { TuiFilterPipeModule,} from "@taiga-ui/cdk";
import {TuiInputModule,TuiFilterByInputPipeModule,TuiComboBoxModule,TuiDataListWrapperModule,TuiToggleModule,TuiProgressModule} from '@taiga-ui/kit';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiInputModule,
    TuiFilterByInputPipeModule,
    TuiDataListWrapperModule,
    
    TuiToggleModule,
    TuiFilterPipeModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiLabelModule,
    TuiProgressModule,
    TuiCalendarModule,
    TuiThemeNightModule,
    TuiModeModule
  ],
  exports:[
    TuiLoaderModule,
    TuiInputModule,
    TuiFilterByInputPipeModule,
    TuiDataListWrapperModule, 
    TuiToggleModule,
    TuiFilterPipeModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiLabelModule,
    TuiProgressModule,
    TuiCalendarModule,
    TuiThemeNightModule,
    TuiModeModule
  ]
})
export class TaigaUiModule { }
