import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  deviceId: any;
  scanType: string;
  id: string;
  result = '';
  video: any;
  scanner: any;


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.deviceId = params.get('deviceId');
      this.scanType= params.get('scanType');
    });
  }

  reset() {

  }
}
