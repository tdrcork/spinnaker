import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Base Angular Modules */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Routes } from '@angular/router';

/* Component Modules */
import { AppComponent } from './app.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './billboards/home/home.component';
import { AuthService } from './user/auth.service';

/* Design Modules */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';

import 'hammerjs';
import { TabsComponent } from './pages/tabs/tabs.component';
/* Amazon AWS SDK imports */

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
