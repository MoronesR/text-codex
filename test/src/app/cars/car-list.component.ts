import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CarService } from './car.service';
import { Car } from './car';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  cars$!: Observable<Car[]>;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.cars$ = this.carService.getCars();
  }

  deleteCar(car: Car) {
    if (car.id && confirm('¿Eliminar automóvil?')) {
      this.carService.deleteCar(car.id).subscribe(() => this.loadCars());
    }
  }
}
