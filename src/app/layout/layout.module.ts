import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content/main-content.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [MainContentComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([])
  ],
  exports: [MainContentComponent]
})
export class LayoutModule { }
