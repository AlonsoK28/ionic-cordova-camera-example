import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image: string;

  constructor( private camera: Camera ) {}

  takePhoto(){
    const options:CameraOptions = {
      allowEdit: false,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options)
    .then( (data) =>{
      const base64 = 'data:image/jpeg;base64,';
      this.image = `${base64}${data}`;
    }), (err) => {
      console.log('Error');
    }
  }

}
