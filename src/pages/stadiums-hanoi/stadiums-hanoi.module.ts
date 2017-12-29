import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StadiumsHanoiPage } from './stadiums-hanoi';

@NgModule({
  declarations: [
    StadiumsHanoiPage,
  ],
  imports: [
    IonicPageModule.forChild(StadiumsHanoiPage),
  ],
})
export class StadiumsHanoiPageModule {}
