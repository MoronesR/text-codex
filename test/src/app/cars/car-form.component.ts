import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarService } from './car.service';
import { Car } from './car';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  form: FormGroup;
  carId?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      vin: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.carId = +id;
      this.carService.getCar(this.carId).subscribe(car => this.form.patchValue(car));
    }
  }

  submit() {
    if (this.form.invalid) return;
    const car: Car = this.form.value;
    if (this.isEdit) {
      this.carService.updateCar(this.carId!, car).subscribe(() => this.router.navigate(['/cars']));
    } else {
      this.carService.createCar(car).subscribe(() => this.router.navigate(['/cars']));
    }
  }
}
