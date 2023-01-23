import { Component } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent {
  constructor(private router: Router) { }

  public permission(event?: any){
    const permissionName = "camera" as PermissionName;
    navigator.permissions.query({ name: permissionName }).then(result => {
      if (result.state === 'granted') {
        this.router.navigate(['/camera'])
      } else if (result.state === 'prompt') {
        // window.location.href = '/accesscamera';
        this.router.navigate(['/accesscamera'])
      }
      // Don't do anything if the permission was denied.
    });
  }

}
