import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WideChatPage } from './wide-chat.page';

const routes: Routes = [
  {
    path: '',
    component: WideChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WideChatPageRoutingModule {}
