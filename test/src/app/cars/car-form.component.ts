import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Car } from './car.model';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnChanges {
  @Input() car: Car | null = null;
  @Output() save = new EventEmitter<Car>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(1886)]],
    vin: ['', Validators.required],
    status: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['car'] && this.car) {
      this.form.patchValue(this.car);
    } else if (changes['car'] && !this.car) {
      this.form.reset({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        vin: '',
        status: ''
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.getRawValue();
      this.save.emit({ ...(this.car ?? {}), ...value } as Car);
    }
  }
}
