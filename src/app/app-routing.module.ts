import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './screens/pagenotfound/pagenotfound.component';
import { WeatherComponent } from './screens/weather/weather.component';

const routes: Routes =
  [
    {
      path: '',
      component: AppComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        
        { path: 'weather', loadChildren: () => import('./screens/weather/weather.module').then(m => m.WeatherModule) },
        { path: '', loadChildren: () => import('./screens/home/home.module').then(m => m.HomeModule) }]
    },

    
    {
      path: '**', 
      component:PagenotfoundComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
