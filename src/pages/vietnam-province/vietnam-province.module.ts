import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VietnamProvincePage } from './vietnam-province';

@NgModule({
  declarations: [
    VietnamProvincePage,
  ],
  imports: [
    IonicPageModule.forChild(VietnamProvincePage),
  ],
})
export class VietnamProvincePageModule {}
