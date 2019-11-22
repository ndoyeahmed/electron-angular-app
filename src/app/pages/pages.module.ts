import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user/user.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    SharedModule
  ]
})
export class PagesModule { }
