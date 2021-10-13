import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExternalDynamsoftComponent } from './external/dynamsoft/external-dynamsoft.component';
import { WebcamDynamsoftComponent } from './webcam/dynamsoft/webcam-dynamsoft.component';
import { WebcamZxingCurrentComponent } from './webcam/zxing-current/webcam-zxing-current.component';
import { ExternalZxingCurrentComponent } from './external/zxing-current/external-zxing-current.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    ExternalDynamsoftComponent,
    WebcamDynamsoftComponent,
    WebcamZxingCurrentComponent,
    ExternalZxingCurrentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
