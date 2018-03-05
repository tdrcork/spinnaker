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
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './billboards/home/home.component';

/* Design Modules */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

/* Angular Material Form Modules */
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import 'hammerjs';
import { TabsComponent } from './pages/tabs/tabs.component';
import { SpacerComponent } from './pages/spacer/spacer.component';
import { AboutComponent } from './pages/about/about.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { IndividualComponent } from './billboards/individual/individual.component';
import { ServicesComponent } from './billboards/services/services.component';
/* Amazon AWS SDK imports */

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TabsComponent,
    SpacerComponent,
    AboutComponent,
    FooterComponent,
    IndividualComponent,
    ServicesComponent
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
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
