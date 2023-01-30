import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{
  apiLoaded: Observable<boolean>;
  constructor(httpClient: HttpClient, private ngZone: NgZone) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBg7qd4aSOs4pJS28MZLnfUmh8kcf39pw4&libraries=places,geometry&callback=initMap&v=weekly', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }
 
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false })
  public info!: MapInfoWindow;
  @ViewChild('btn')
  public btnRef!: ElementRef;

  zoom = 16;
  // center!: google.maps.LatLngLiteral;
  center =  {
    lat: 0,
    lng: 0,

  }
  fixcenter = {
    lat: 0,
    lng: 0,
  }

  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    streetViewControl: true,
    scaleControl: true,
  };
  latitude!: any;
  longitude!: any;
  mapClick!: any;
  markerPositions: google.maps.LatLngLiteral[] = [];
  infoContent: any;

  //function
  addMarker(event){
    console.log("Adding Work");
    console.log("Latitude: " + event.latLng.lat());
    console.log("Longtitude: " + event.latLng.lng());
    this.center = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
  }

  addContent(event){
    return ("Latitude: " + event.latLng.lat() + "\n" +
    "Longtitude: " + event.latLng.lng());
  }

  openInfoWindow(marker: MapMarker, event) {
    this.infoContent = this.addContent(event);
    this.info.open(marker);
  }
  

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        
      };
      this.fixcenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      let test = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      
      
      let btncenter = document.getElementById("btn") as HTMLButtonElement;
      btncenter.addEventListener("click", () => {
        console.log(btncenter);
        console.log(this.center);
        this.center = this.fixcenter;
        console.log(this.center);
        location.reload()
        return btncenter;
      });
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchElementRef.nativeElement
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        this.btnRef.nativeElement
      );
    test.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = test.getPlace();
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        console.log({ place }, place.geometry.location?.lat(), place.geometry.location?.lng());
        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };
      });
    });
    });
     
  }
}




 


 