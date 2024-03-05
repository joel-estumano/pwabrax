import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDatePipe } from './pipes/firebase-date.pipe';


@NgModule({
  declarations: [
    FirebaseDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [FirebaseDatePipe]
})
export class CustomPipesModule { }
