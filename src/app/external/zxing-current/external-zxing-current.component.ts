import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var ZXing: any;

@Component({
  selector: 'app-external-zxing-current',
  templateUrl: './external-zxing-current.component.html',
  styleUrls: ['./external-zxing-current.component.css']
})
export class ExternalZxingCurrentComponent implements OnInit {
  id: string;
  result = '';
  video: any;
  codeReader: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.video = document.getElementById('video');

    if (window.hasOwnProperty('ZXing') && !!ZXing.BrowserMultiFormatReader) {
      var hints = new Map(),
        formats = ZXing.BarcodeFormat[ZXing.BarcodeFormat['PDF_417']];

      hints.set(
        ZXing.DecodeHintType[ZXing.DecodeHintType['POSSIBLE_FORMATS']],
        formats
      );
      this.codeReader = new ZXing.BrowserMultiFormatReader(hints);
    } else if (this.codeReader === undefined) {
      // browser not supported
      window.alert('This browser does not support barcode scanning.');
      this.result = 'ERROR';
    }

    this.parseBarcode();
  }

  parseBarcode() {
    this.codeReader
      .decodeOnceFromVideoDevice(this.id, 'video')
      .then((data: { text: string }) => {
        this.result = data.text;
      });
  }

  reset() {
    this.result = '';
    this.parseBarcode();
  }
}
