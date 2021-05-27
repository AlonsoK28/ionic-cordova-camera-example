import { Component } from '@angular/core';

// ionic
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
               public modalController: ModalController,
               public toastController: ToastController ) {}

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
    }, () => this.showCameraToast())
  }
  
  async showModalCamera(){
    const modal = await this.modalController.create({
      component: ModalCameraPageComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async showCameraToast() {
    const toast = await this.toastController.create({
      message: 'Camera is unavailable on this device',
      position: 'bottom',
      translucent: true,
      keyboardClose: true,
      duration: 10000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
