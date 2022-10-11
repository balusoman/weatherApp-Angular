import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './screens/pagenotfound/pagenotfound.component';
import { WeatherComponent } from './screens/weather/weather.component';

const routes: Routes =
  [
    {
      path: '',
      component: AppComponent,
      children: [
        { path: '', redirectTo: 'weather', pathMatch: 'full' },
        { path: 'weather', loadChildren: () => import('./screens/weather/weather.module').then(m => m.WeatherModule) },
        { path: 'home', loadChildren: () => import('./screens/home/home.module').then(m => m.HomeModule) }]
    },
    {
      path: '**', 
      component:PagenotfoundComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents =[
//   WeatherComponent
// ]
