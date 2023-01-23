import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CameraComponent } from './camera/camera.component';
import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';
import { WebcamModule } from 'ngx-webcam'; 
import { GoogleMapsModule } from '@angular/google-maps';
import { AccessCameraComponent } from './camera/access-camera.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MainpageComponent } from './camera/mainpage.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    HomeComponent,
    MapsComponent,
    AccessCameraComponent,
    MainpageComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    NgbNavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    WebcamModule,
    MatProgressBarModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
