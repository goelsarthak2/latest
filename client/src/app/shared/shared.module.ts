import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,MatProgressSpinnerModule
  ],
  exports: [ 
    MaterialModule ,MatProgressSpinnerModule
  ],
  declarations: []
})
export class SharedModule { }
