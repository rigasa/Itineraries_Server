import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//--------------------
import { IItineraries } from '../../../../models/itineraries.model';
import { ItinerariesService } from '../../../../shared/services/itineraries/itineraries.service';
//--------------------
@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
  //encapsulation: ViewEncapsulation.None
})
export class HomeMapComponent implements OnInit {

  public itineraries$: Observable<any[]>;

  public defaultSettings: Object = {
    latitude: 46.2587, 
    longitude: 6.11938, 
    zoom: 11, 
    customStyle: true
  };
  
  constructor( 
    private _router: Router,
    private _itiService: ItinerariesService
  ) { }

  ngOnInit() {
    this.itineraries$ = this._itiService.loadItineraries()/*.pipe(
      map(value => {
        if (value.SUCCESS ) return value.SUCCESS.datas;
        return [];
      })
    );*/
  }

  goItinerary( itinerary: IItineraries ): void {
    //console.log('::: Go to itinerary', itinerary );
    this._router.navigate(['itinerary', itinerary.id ] );
  }

  setFavorit( itinerary: IItineraries ): void {
    console.log('::: Save Favorit', itinerary );
  }

}
