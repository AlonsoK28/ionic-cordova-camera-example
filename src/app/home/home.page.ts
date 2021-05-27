import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image: string;

  constructor( private camera: Camera,
               private webView: WebView ) {}

  takePhoto(){
    const options:CameraOptions = {
      allowEdit: false,
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options)
    .then( (data) =>{
      const base64 = 'data:image/jpeg;base64,';
      this.image = this.webView.convertFileSrc(data);
    }), (err) => {
      console.log('Error: ', err);
    }
  }

}
