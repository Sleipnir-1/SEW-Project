import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoneItemsPage } from './done-items.page';

const routes: Routes = [
  {
    path: '',
    component: DoneItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoneItemsPageRoutingModule {}
