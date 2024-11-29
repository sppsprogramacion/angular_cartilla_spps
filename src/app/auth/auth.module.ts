import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppRoutingModule } from '../app-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';

import { RegistroComponent } from './registro/registro.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    LoginUsuarioComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,

    CalendarModule,
    BrowserAnimationsModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    TableModule,
    TabViewModule,//funciona ng-template
    
    ToolbarModule,
    
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
