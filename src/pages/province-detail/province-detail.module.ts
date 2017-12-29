import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProvinceDetailPage } from './province-detail';

@NgModule({
  declarations: [
    ProvinceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProvinceDetailPage),
  ],
})
export class ProvinceDetailPageModule {}
