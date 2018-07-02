import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { ItineraryRoutingModule } from './itinerary.routing';
import { ItineraryCoverComponent } from './containers/itinerary-cover/itinerary-cover.component';
import { ItineraryPointComponent } from './containers/itinerary-point/itinerary-point.component';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    CommonModule,
    ItineraryRoutingModule
  ],
  declarations: [
    ItineraryCoverComponent, 
    ItineraryPointComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItineraryModule { }
