import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { DataDisplayFieldComponent } from '../data-display-field/data-display-field.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, DataDisplayFieldComponent, GoogleMapsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  receivedData!: string;
  cen!: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    center: undefined,
    zoom: 18,
  };

  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Retrieve the data passed from the input form component
    this.route.params.subscribe(params => {
      this.receivedData = params['data'];
    });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': this.receivedData}, (results, status) => {
      if (status == 'OK') {
        this.cen = results![0].geometry.location;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}