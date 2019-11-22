import { CommonModule } from '@angular/common';
import {AuthenticationService} from './auth/authentication.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {NgModule} from '@angular/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthenticationService, AuthGuardService]
})
export class SharedModule { }
