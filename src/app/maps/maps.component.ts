import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';
let position, lat, long;
let latshow, txt, longshow, txt2, center;

async function getLatlong() {
  latshow = document.getElementById("latshow") as HTMLElement;
  longshow = document.getElementById("longshow") as HTMLElement;
  
  
  try {
    position = await navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      txt = document.createTextNode(lat);
      txt2 = document.createTextNode(long);
      latshow.appendChild(txt);
      longshow.appendChild(txt2);
      
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      

    });
    
  } catch (error) {
    
  }
}

function initMap(){
  console.log("initMap working...");

}




    

  
  
  

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
        console.log("constructor");
        
  }

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap)
  public map!: GoogleMap;
  @ViewChild(MapInfoWindow)
  public info!: MapInfoWindow;

  
  
  

  zoom = 16;
  // center!: google.maps.LatLngLiteral;
  center =  {
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
    
    // maxZoom:this.maxZoom,
    // minZoom:this.minZoom,
  };
  latitude!: any;
  longitude!: any;
  mapClick!: any;



  

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    

    
  }
  
  ngOnInit() {
    console.log("ngOnInit");
    
 
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        
      };
      let test = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
       // Align search box to center
    // this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    //   this.searchElementRef.nativeElement
    // );
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

let xx = document.getElementById("myGoogleMap") as HTMLElement;
console.log(xx);



     });
  }
}




 


 