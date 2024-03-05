import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { CustomLoginModule } from 'src/app/components/organism/login/login.component.module';
import { CustomRegisterModule } from 'src/app/components/organism/register/register.component.module';
import { CustomForgotModule } from 'src/app/components/organism/forgot/forgot.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    CustomLoginModule,
    CustomRegisterModule,
    CustomForgotModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
