import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather.component';

const routes: Routes = [
  { path: '', component: WeatherComponent ,
children:[ 
  {
    path:'',
    pathMatch:'full',
    redirectTo:'dashboard'
  },
  { 
    path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: 'info', loadChildren: () => import('./info/info.module').then(m => m.InfoModule) }
]
},
]




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
