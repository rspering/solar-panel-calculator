import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { DataDisplayFieldComponent } from '../data-display-field/data-display-field.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, DataDisplayFieldComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

}
