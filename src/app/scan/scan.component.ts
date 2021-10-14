import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextResult } from 'dynamsoft-javascript-barcode';

import DBR from '../../dbr';
declare var ZXing: any;

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  deviceId: any;
  scanType: string;
  result = '';
  video: any;
  scanner: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.deviceId = params.get('deviceId');
      this.scanType= params.get('scanType');
    });

    this.video = document.getElementById('video');

    switch(this.scanType) {
      case "ZXing (Current)":
        if (window.hasOwnProperty('ZXing') && !!ZXing.BrowserMultiFormatReader) {
          var hints = new Map(),
            formats = ZXing.BarcodeFormat[ZXing.BarcodeFormat['PDF_417']];
    
          hints.set(
            ZXing.DecodeHintType[ZXing.DecodeHintType['POSSIBLE_FORMATS']],
            formats
          );
          this.scanner = new ZXing.BrowserMultiFormatReader(hints);
        } else if (this.scanner === undefined) {
          // browser not supported
          window.alert('This browser does not support barcode scanning.');
          this.result = 'ERROR';
        }
    
        this.zxingParseBarcode();
      break;
      case "Dynamsoft":
        await DBR.BarcodeScanner.loadWasm();
    
        this.scanner = await DBR.BarcodeScanner.createInstance();
        this.scanner.setUIElement(this.video);
    
        await this.scanner.open();
        await this.scanner.setCurrentCamera(this.deviceId);

        this.dynamsoftParseBarcode();
      break;
    }
  }

  zxingParseBarcode(){
    this.scanner
      .decodeOnceFromVideoDevice(this.deviceId, 'video')
      .then((data: { text: string }) => {
        this.result = data.text;
      });
  }

  dynamsoftParseBarcode(){
    this.scanner.onUnduplicatedRead= (txt: string, result: TextResult) => {
      this.result = txt;
     };
  }

  reset() {
    this.result = "";

    switch(this.scanType){
      case "ZXing (Current)":
        this.zxingParseBarcode();
      break;
      case "Dynamsoft":
        this.dynamsoftParseBarcode();
      break;
    }
  }
}
