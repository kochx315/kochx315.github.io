import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalDynamsoftComponent } from './external/dynamsoft/external-dynamsoft.component';
import { ExternalZxingCurrentComponent } from './external/zxing-current/external-zxing-current.component';
import { WebcamDynamsoftComponent } from './webcam/dynamsoft/webcam-dynamsoft.component';
import { WebcamZxingCurrentComponent } from './webcam/zxing-current/webcam-zxing-current.component';

const routes: Routes = [
  {path: 'external/dynamsoft/:id', component: ExternalDynamsoftComponent},
  {path: 'external/zxing-current/:id', component: ExternalZxingCurrentComponent},
  {path: 'webcam/dynamsoft/:id', component: WebcamDynamsoftComponent},
  {path: 'webcam/zxing-current/:id', component: WebcamZxingCurrentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
