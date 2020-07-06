import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CustomSnackBarComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  
  declarations: [
    AppComponent,
    CustomSnackBarComponent,
    DialogExampleComponent
  ],

  entryComponents: [
    CustomSnackBarComponent,
    DialogExampleComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule
  ],

  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

