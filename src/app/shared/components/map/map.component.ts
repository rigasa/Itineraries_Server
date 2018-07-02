import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { MapConfig } from './map.config';
import { IMapConfig } from './map.config.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Input() mapSettings: IMapConfig;
  private _map: any;
  private _promise: any;
  constructor() {
    
   }

  ngAfterViewInit() {
    this.startMap( MapConfig );
  }
  //----------------------------------
  //----------------------------------
  //----------------------------------
  // INIT MAP
  //----------------------------------
  //----------------------------------
  //----------------------------------
  startMap( thisConfig ): void {
  
    const _settings = this.getSettings();

    if ( typeof( google ) === 'undefined' ) {

      this.loadGMapsAPI( _settings.api_key )
      .then(( response: any ) => {
          this.initMap( MapConfig );
      });

    } else {
      this.initMap( MapConfig );
    }
  }

  initMap( defaultConfig ): void {
    //
    const _settings = this.getSettings();

    const POSITION = {
      lat: _settings.latitude || defaultConfig.latitude, 
      lng: _settings.longitude || defaultConfig.longitude
    };
    //---------------------------------
    // Create Map
    this._map = new google.maps.Map(document.getElementById( _settings.selector ), {
      zoom: _settings.zoom,
      center: POSITION
    });

    /*const marker = new google.maps.Marker({
      position: POSITION,
      map: this._map
    });*/
    //---------------------------------
    // Custom style if selected
    if(( typeof( _settings.customStyle ) !== 'undefined' ) && ( _settings.customStyle ) ){
      let _style = this.getCustomStyle(); 
      this._map.setOptions( { styles: _style } );
    }
    //---------------------------------
  }
  //----------------------------------
  //----------------------------------
  //----------------------------------
  // CUSTOM STYLES
  // https://developers.google.com/maps/documentation/javascript/styling
  //----------------------------------
  //----------------------------------
  //----------------------------------
  getCustomStyle(): any[]{

   return [
  	  {
  		stylers: [
  		  { hue: "#00ffe6" },
  		  { saturation: -20 }
  		]
  	  },{
  		featureType: "road",
  		elementType: "geometry",
  		stylers: [
  		  { lightness: 100 },
  		  { visibility: "simplified" }
  		]
  	  },{
  		featureType: "road",
  		elementType: "labels",
  		stylers: [
  		  { visibility: "off" }
  		]
  	  }
  	];
  }

  //----------------------------------
  //----------------------------------
  //----------------------------------
  // Utilities
  //----------------------------------
  //----------------------------------
  //----------------------------------
  getSettings(){
    // Fusion de MapConfig avec mapSettings
    return Object.assign( MapConfig, this.mapSettings);
  }
  //----------------------------------
  //Load the Google Maps API javascript
  loadGMapsAPI( key ): any {

    if (typeof( this._promise ) === 'undefined' ) {
      this._promise = new Promise( resolve => {
        window['__onGapiLoaded'] = (ev) => {
          resolve(google);
        }
        if ( typeof google === 'undefined') {
          const _script = document.createElement('script');
          _script.src = `//maps.googleapis.com/maps/api/js?key=${key}&callback=__onGapiLoaded`;
          _script.async = true;
          document.body.appendChild( _script );
        } else {
          resolve();
        }
      });
    }
    return this._promise;
  }
  //----------------------------------
  //----------------------------------
  //----------------------------------

}
