import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from './car.service';
import { CarFormComponent } from './car-form.component';
import { Observable } from 'rxjs';
import { Car } from './car.model';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, CarFormComponent],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  cars$: Observable<Car[]> = this.carService.cars$;
  editingCar: Car | null = null;
  showForm = false;

  constructor(private carService: CarService) {}

  add(): void {
    this.editingCar = null;
    this.showForm = true;
  }

  edit(car: Car): void {
    this.editingCar = { ...car };
    this.showForm = true;
  }

  save(car: Car): void {
    if (this.editingCar) {
      car.id = this.editingCar.id;
      this.carService.updateCar(car);
    } else {
      this.carService.addCar(car);
    }
    this.cancel();
  }

  cancel(): void {
    this.showForm = false;
    this.editingCar = null;
  }

  delete(car: Car): void {
    if (confirm('¿Eliminar automóvil?')) {
      this.carService.deleteCar(car.id!);
    }
  }
}
