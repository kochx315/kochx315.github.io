import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  devices: any[] = [];
  selectedDeviceId: any;

  scanningLibraries = ["ZXing (Current)", "Dynamsoft"];
  selectedScanningLibrary: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      devices.forEach(device => {
        if(device.kind === 'videoinput') {
          this.devices.push(device);
        }
      });
    });
  }

  onDeviceChange(event){
    this.selectedDeviceId = event.value;
  }

  onScanningLibraryChange(event) {
    this.selectedScanningLibrary = event.value;
  }

  scan() {
    if(this.selectedDeviceId !== undefined && this.selectedScanningLibrary !== undefined) {
      this.router.navigate(['scan'], { queryParams: { deviceId: this.selectedDeviceId,  scanType: this.selectedScanningLibrary}} );
    }
  }
}
