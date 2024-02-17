import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-display-field',
  standalone: true,
  imports: [],
  templateUrl: './data-display-field.component.html',
  styleUrl: './data-display-field.component.css'
})
export class DataDisplayFieldComponent {
  @Input() title: string | undefined = "";
  @Input() dataValue: string | undefined = "";
  @Input() unit: string | undefined = "";
}
