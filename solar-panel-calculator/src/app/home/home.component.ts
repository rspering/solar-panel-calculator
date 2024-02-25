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
    address: ''
  });
  inputData!: string;

  constructor(@Inject(Router) private router: Router, private formBuilder: FormBuilder) {}

  onSubmit(): void {
    // Navigate to another page along with the input data
    this.inputData = this.checkoutForm.value.address!;
    this.router.navigate(['/results', this.inputData]);
  }
}
