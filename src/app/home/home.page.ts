import { Component } from '@angular/core';

// ionic
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ModalController } from '@ionic/angular';

// components
import { ModalCameraPageComponent } from '../modal/modal-camera-page/modal-camera-page.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image: string;

  constructor( private camera: Camera,
               private webView: WebView,
               public modalController: ModalController ) {}

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
    }, () => this.showModalCamera())
  }
  
  async showModalCamera(){
    const modal = await this.modalController.create({
      component: ModalCameraPageComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
