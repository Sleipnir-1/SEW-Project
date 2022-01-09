import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoneItemsPageRoutingModule } from './done-items-routing.module';

import { DoneItemsPage } from './done-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoneItemsPageRoutingModule
  ],
  declarations: [DoneItemsPage]
})
export class DoneItemsPageModule {}
