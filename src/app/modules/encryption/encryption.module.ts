import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule  } from '@angular/forms';

import { EncryptionRoutingModule } from './encryption-routing.module';
import { RegisterComponent } from './components/register/register.component';

import { SharingDataService } from './services/sharing-data.service';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    EncryptionRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SharingDataService
  ]
})
export class EncryptionModule { }
