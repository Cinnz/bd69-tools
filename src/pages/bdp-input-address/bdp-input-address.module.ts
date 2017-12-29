import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdpInputAddressPage } from './bdp-input-address';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BdpInputAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(BdpInputAddressPage),
    ComponentsModule
  ],
})
export class BdpInputAddressPageModule {}
