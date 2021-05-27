import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-camera-page',
  templateUrl: './modal-camera-page.component.html',
  styleUrls: ['./modal-camera-page.component.scss'],
})
export class ModalCameraPageComponent implements OnInit {

  constructor( public modalController: ModalController ) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }

}
