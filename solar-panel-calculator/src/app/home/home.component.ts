import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { Inject } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavBarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  checkoutForm = this.formBuilder.group({
    address: '',
    sqft: 0
  });
  inputData!: {address: string, sqft: number};

  constructor(@Inject(Router) private router: Router, private formBuilder: FormBuilder) {}

  onSubmit(): void {
    // Navigate to another page along with the input data
    this.inputData = {
      address: this.checkoutForm.value.address!,
      sqft: this.checkoutForm.value.sqft!
    };
    this.router.navigate(['/results', this.inputData.sqft, this.inputData.address]);
  }
}
