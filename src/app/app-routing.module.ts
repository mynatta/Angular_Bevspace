import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessCameraComponent } from './camera/access-camera.component';
import { CameraComponent } from './camera/camera.component';
import { MainpageComponent } from './camera/mainpage.component';
import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component:HomeComponent },
  {path: 'camera', component:CameraComponent },
  {path: 'maps', component:MapsComponent},
  {path: 'accesscamera', component:AccessCameraComponent},
  {path: 'maincamera', component:MainpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
