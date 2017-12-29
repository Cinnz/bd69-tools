import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StadiumsPage } from './stadiums';

@NgModule({
  declarations: [
    StadiumsPage,
  ],
  imports: [
    IonicPageModule.forChild(StadiumsPage),
  ],
})
export class StadiumsPageModule {}
