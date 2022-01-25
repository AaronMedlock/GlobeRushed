import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  // Currated dummy data
  curratedLocations = [
    { lat: 53.484787, lng: -2.317712, name: "Salford, United Kingdom"},
    { lat: -32.0106441, lng: 115.7522977, name: "Perth, Australia"},
    { lat: 35.7040744, lng: 139.5577317, name: "Tokyo, Japan"},
    { lat: 44.2744468, lng: -77.742858, name: "Harcourt, Ontario Canada"},
    { lat: 30.2417765, lng: -97.7268773, name: "Austin,TX USA"},
    { lat: 60.3608533, lng: 5.3696853, name: "Bergen, Norway" },
    { lat: 38.9527529, lng: -77.3508511, name: "Reston, VA USA"},
    { lat: 47.907979, lng: 1.967564, name: "Saint-Jean-de-Braye, France" },
    { lat: 36.117093, lng: -115.182074, name: "Las Vegas, NV USA" },
    { lat: 24.482446, lng: 118.316943, name: "Jinning Township"},
    { lat: -26.938312, lng: -68.74491499999999, name: "Watford, United Kingdom"},
    { lat: 60.534114, lng: -149.55007899999998, name: "Moose Pass, AK USA" },
    { lat: 60.070409, lng: 6.542388999999957, name: "Odda, Norway" },
    { lat: 75.4081407, lng: -89.5874263, name: "Nunavut, Canada"},
    { lat: 30.184983, lng: -84.72466199999997, name: "Liberty County, FL USA" },
    { lat: 36.252972, lng: 136.90053699999999, name: "Gifu, Japan" },
    { lat: 27.814125, lng: 86.713193, name: "Khumjung, Nepal"},
    { lat: 36.2381539, lng: 137.9683151, name: "Nagano, Japan"},
    //{ lat: 64.0444798, lng: -16.1711884, name: "Eastern Region, Iceland"}, // Fails SV
    { lat: 42.658402, lng: 11.633269, name: "Province of Grosseto, Italy"},
    { lat: 30.3248983, lng: 35.4471292, name: "Wadi Musa, Jordan"},
    { lat: 47.51075, lng: 10.390309, name: "Bad Hindelang, Germany"},
    { lat: 53.043081, lng: 57.064946, name: "Republic of Bashkortostan, Russia"},
    { lat: -8.4226166, lng: 115.3124971, name: "Bali, Indonesia" },
    { lat: 35.659607, lng: 139.700378, name: "Shibuya City, Tokyo, Japan" },
    //{ lat: 50.087586, lng: 14.421231, name: "Prague, Czechia" }, // Fails SV
    { lat: -13.165713, lng: -72.545542, name: "Aguas Calientes, Peru" },
    { lat: 41.403286, lng: 2.174673, name: "Barcelona, Spain" },
    { lat: 34.2752105, lng: -119.2913408, name: "Ventura, CA USA"},
    { lat: -14.251967, lng: -170.689851, name: "Tafeu Cove, American Samoa"},
    { lat: 33.461503, lng: 126.939297, name: "Jeju-do, South Korea" },
    { lat: -64.731988, lng: -62.594564, name: "Danco Island, Antarctica" },
    { lat: 27.17557, lng: 78.041462, name: "Uttar Pradesh, India" },
    { lat: 68.19649, lng: 13.53183, name: "Repp, Norway" },
    //{ lat: 53.2783229, lng: 107.3506844, name: "Lake Baikal, Russia" }, // Fails SV
    { lat: 59.9387245, lng: 30.3163621, name: "St Petersburg, Russia" },
    { lat: 40.4900264, lng: -75.0729199, name: "Tinicum Township, PA USA" },
    { lat: 14.5841104, lng: 120.9799109, name: "Kalakhang Maynila, Philippines"},
    { lat: 10.6422373, lng: 122.2358045, name: "Iloilo, Philippines"},
    { lat: 18.0619395, lng: 120.5205914, name: "Ilocos Norte, Philippines" },
    { lat: 37.8214233, lng: -122.4801453, name: "San Francisco, CA USA" },
  ]

  // Generated locations (Backup dummy data)
  locations = [
    { lat: 53.484787, lng: -2.317712 },
    { lat: 47.907979, lng: 1.967564 },
    { lat: 36.117093, lng: -115.182074 },
    { lat: 24.482446, lng: 118.316943 },
    { lat: -26.938312, lng: -68.74491499999999 },
    { lat: 60.534114, lng: -149.55007899999998 },
    { lat: 60.070409, lng: 6.542388999999957 },
    { lat: 30.184983, lng: -84.72466199999997 },
    { lat: 36.252972, lng: 136.90053699999999 },
    { lat: 48.865937, lng: 2.312376 },
    { lat: 27.814125, lng: 86.713193 },
    { lat: 36.2381539, lng: 137.9683151 },
    { lat: 64.0444798, lng: -16.1711884 },
    { lat: 42.658402, lng: 11.633269 },
    { lat: 30.3248983, lng: 35.4471292 },
    { lat: 47.51075, lng: 10.390309 },
    { lat: 53.043081, lng: 57.064946 },
    { lat: -8.4226166, lng: 115.3124971 },
    { lat: 35.659607, lng: 139.700378 },
    { lat: 50.087586, lng: 14.421231 },
    { lat: -13.165713, lng: -72.545542 },
    { lat: 41.403286, lng: 2.174673 },
    { lat: -14.251967, lng: -170.689851 },
    { lat: 33.461503, lng: 126.939297 },
    { lat: -64.731988, lng: -62.594564 },
    { lat: 27.17557, lng: 78.041462 },
    { lat: 68.19649, lng: 13.53183 },
    { lat: 53.2783229, lng: 107.3506844 },
    { lat: 59.9387245, lng: 30.3163621 },
    { lat: 40.4900264, lng: -75.0729199 },
    { lat: 14.5841104, lng: 120.9799109 },
    { lat: 17.5707683, lng: 120.3886023 },
    { lat: 10.6422373, lng: 122.2358045 },
    { lat: 18.0619395, lng: 120.5205914 },
    { lat: 17.5713349, lng: 120.3887765 },
    { lat: 0.5738293, lng: 37.5750599 },
    { lat: -1.3766622, lng: 36.7743556 },
    { lat: 44.208545, lng: 24.778931 },
    { lat: 47.402134, lng: 19.189816 },
    { lat: 34.707468, lng: 135.213605 },
    { lat: 38.402741, lng: 27.125614 },
    { lat: 52.213632, lng: 21.021158 },
    { lat: -2.537582, lng: -44.211207 },
    { lat: 43.218129, lng: 27.980660 },
    { lat: 6.685249, lng: -1.611490 },
    { lat: 40.646979, lng: -73.962654 },
    { lat: 50.907993, lng: 22.786688 },
    { lat: 32.921266, lng: -85.96173 },
    { lat: 45.642776, lng: 19.697091 },
    { lat: 57.695923, lng: 27.121468 },
    { lat: 64.130557, lng: -51.668284 },
    { lat: 35.099203, lng: 132.860765 },
    { lat: 42.399454, lng: -87.943074 },
    { lat: 25.578881, lng: 28.285675 }
  ];
  constructor() { }

  getGameRoundLocations(num: number = 4){
    let locationIndexSet = new Set(),
        locationIndexArr = [];

    for(let i = 0; i < num * 1.5; i++){
      locationIndexSet.add(
        this.curratedLocations[Math.floor(Math.random() * this.curratedLocations.length)]
      );
    }

    for(let i = 0; i < num; i++){
      locationIndexArr.push( Array.from(locationIndexSet)[i] );
    }

    return locationIndexArr;
  }


  getRandomSingleLocation(){
    return this.locations[Math.floor(Math.random() * this.locations.length)];
  }



}
