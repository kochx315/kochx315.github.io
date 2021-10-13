import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Drivers License Scanner';
  webcamId: string;
  externalId: string;

  ngOnInit(): void {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      devices.forEach(device => {
        switch(device.label) {
          case "HP HD Camera (04ca:7089)":
            this.webcamId = device.deviceId;
          break;
          case "Reincubate Camo":
            this.externalId = device.deviceId;
          break;
        }
      });
    });
  }
}