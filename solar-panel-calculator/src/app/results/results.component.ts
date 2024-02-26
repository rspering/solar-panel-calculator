import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { DataDisplayFieldComponent } from '../data-display-field/data-display-field.component';
import { FooterComponent } from '../footer/footer.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone: true,
  imports: [NavBarComponent, FooterComponent, DataDisplayFieldComponent, GoogleMapsModule],
})
export class ResultsComponent implements OnInit {
  sqft!: number;
  address!: string;
  cen!: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    center: undefined,
    zoom: 18,
  };

  latitude!: number | string;
  powerGenerated!: number | string;
  emissionsReduced!: number | string;
  costOfInstallation!: number | string;
  energySavings!: number | string;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Retrieve the data passed from the input form component
    this.route.params.subscribe(async params => {
      this.sqft = params['sqft'];
      this.address = params['address'];

      // Call functions dependent on retrieved parameters
      this.geocodeAddress();
    });
  }

  geocodeAddress() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.address }, (results: any, status: string) => {
      if (status == 'OK') {
        this.cen = results![0].geometry.location;
        this.latitude = this.cen.lat();
        this.calculateResults();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  calculateResults() {
    this.powerGenerated = calculatePowerGenerated(this.sqft, this.latitude as number);
    this.emissionsReduced = calculateEmissionsReduced(this.sqft, this.latitude as number);
    this.costOfInstallation = calculateCostOfInstallation(this.sqft);
    this.energySavings = calculateEnergySavings(this.sqft, this.latitude as number);

    //formatting
    this.powerGenerated = new Intl.NumberFormat().format(this.powerGenerated)
    this.emissionsReduced = new Intl.NumberFormat().format(this.emissionsReduced)
    this.costOfInstallation = this.costOfInstallation.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    this.energySavings = this.energySavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}

const sunlightPerYear = (latitude: number): number => {
  let total = 0, P, D, I;

  for (let J = 0; J <= 365; J++) {
    P=Math.asin(.39795*Math.cos(.2163108 + 2*Math.atan(.9671396*Math.tan(.00860*(J-186)))));
    I=(Math.sin(0.8333*Math.PI/180) + Math.sin(latitude*Math.PI/180)*Math.sin(P))/(Math.cos(latitude*Math.PI/180)*Math.cos(P))
    D= 24-((24/Math.PI)*Math.acos(I));
    total += D;        
  }

  return total;
}

const calculatePowerGenerated = (sqft: number, latitude: number): number => {
  // based off 300w solar panel that measures ~15 sqft
  const numberOfPanels = sqft / 15;
  // kWH
  return 300 * sunlightPerYear(latitude) * numberOfPanels / 1000;
}

const calculateEmissionsReduced = (sqft: number, latitude: number): number => {
  // grams of CO2 emissions
  // based on average emissions produced per kWh
  return calculatePowerGenerated(sqft, latitude) * 1215;
}

const calculateCostOfInstallation = (sqft: number): number => {
  // average cost per square foot of roof to install
  return 21.45 * sqft;
}

const calculateEnergySavings = (sqft: number, latitude: number): number => {
  // based on national average cost per kWh
  return 16.19 * calculatePowerGenerated(sqft, latitude) /100;
}
