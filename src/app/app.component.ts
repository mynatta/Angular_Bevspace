import { Component  , OnInit} from '@angular/core';


declare const myTest: any;
export interface Section{
 name: String;
 icon: String;
 link: String;

}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
  
})


export class AppComponent implements OnInit {
  title = 'my-web';
  weblink = '/home';
  menus: Section[] = [{
    name: 'Home',
    icon: 'home',
    link: '/home',
  }, 
  {
    name: 'Camera',
    icon: 'camera_alt',
    link: '/maincamera',
  },
  {
    name: 'Maps',
    icon: 'maps',
    link: '/maps',
  }
 , ];
 

 ngOnInit(){

 }
 

  
  
  


}


