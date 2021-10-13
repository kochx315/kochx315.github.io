import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextResult } from 'dynamsoft-javascript-barcode';

import DBR from '../../../dbr';

@Component({
  selector: 'app-webcam-dynamsoft',
  templateUrl: './webcam-dynamsoft.component.html',
  styleUrls: ['./webcam-dynamsoft.component.css']
})
export class WebcamDynamsoftComponent implements OnInit {
  id: string;
  result = '';
  video: any;
  scanner: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  async ngOnInit():  Promise<void> {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    await DBR.BarcodeScanner.loadWasm();
    this.video = document.getElementById("video");

    this.scanner = await DBR.BarcodeScanner.createInstance();
    this.scanner.setUIElement(this.video);

    await this.scanner.open();
    await this.scanner.setCurrentCamera(this.id);

    this.reset();
  }

  reset() {
    this.result = "";
    this.scanner.onUnduplicatedRead= (txt: string, result: TextResult) => {
      this.result = txt;
     };
  }
}
