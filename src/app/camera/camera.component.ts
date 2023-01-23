import { Component, OnInit } from '@angular/core';

let front = false;
let stream;  
let image;

const supports = navigator.mediaDevices.getSupportedConstraints();
if (!supports['facingMode']) {
  alert('Browser Not supported!');
}

function mediaStreamConstraints(){
  const constraints = {
  audio: false,
  video: {
    width: 640,
    height: 480,
    facingMode: front ? "user" : "environment",
    frameRate: 60,
    }
  }
return constraints
}

async function accessCamera() {
    
    const videoElem = document.getElementById( "videoelementId") as HTMLVideoElement;
		const button = document.getElementById("btn") as HTMLButtonElement;
    const btnre = document.querySelector('#btnre') as HTMLButtonElement;
    

     try{
        stream = await navigator.mediaDevices.getUserMedia( 
          mediaStreamConstraints() );
        //adding the received stream to the source of the video element
        videoElem.srcObject = stream;
        videoElem.onloadedmetadata = () => {
          videoElem.play();
        };
        button.disabled = false;
    }catch(err) {
        //code to handle the error
        console.log(err)
    }
}







@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  ngOnInit(): void {
    accessCamera()

  }

  public onClick(event:any){
    front = !front;
    console.log("status:"+front)
    const btn = document.querySelector('#btn') as HTMLButtonElement;
    stream.getTracks()
      .forEach(track => track.stop());
    accessCamera()

  }

  public takescreen(){
    const videoElem = document.getElementById( "videoelementId") as HTMLVideoElement;
    const screenshotsEl = document.getElementById('screenshots') as HTMLDivElement;
    var c = document.getElementById("canvas") as HTMLCanvasElement;
    var ctx = c.getContext("2d");
    ctx!.drawImage(videoElem, 0, 0);
    const data = c.toDataURL("image/png");
    c.setAttribute("src", data);


    // const btnre = document.querySelector('#btnre') as HTMLButtonElement;
    // const button = document.getElementById("btn") as HTMLButtonElement;
    // button.disabled = true;
    // btnre.disabled = false;
    // image.takePhoto().then(blob => {
    //   const imgCap = document.createElement('img')
    //   imgCap.src = window.URL.createObjectURL(blob)
    //   imgCap.width = 250;
    //   imgCap.height = 300;
    //   screenshotsEl.appendChild(imgCap)
    
    // })
    console.log(c);
    console.log(ctx);
    
  }

  public retake(){
    const screenshotsEl = document.getElementById('screenshots') as HTMLDivElement;
    const button = document.getElementById("btn") as HTMLButtonElement;
    const btnre = document.querySelector('#btnre') as HTMLButtonElement;
    button.disabled = false;
    btnre.disabled = true;
    const lastnode = screenshotsEl.lastChild as HTMLElement;
    screenshotsEl.removeChild(lastnode);
    
  }

  public clearphoto() {
    var c = document.getElementById("canvas") as HTMLCanvasElement;
    var ctx = c.getContext("2d");
    ctx!.fillStyle = "#FAFAFA";
    ctx!.fillRect(0, 0, c.width, c.height);
    const data = c.toDataURL("image/png");
    c.setAttribute("src", data);
  }


}
    

