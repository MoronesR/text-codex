import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from './car.model';

@Injectable({ providedIn: 'root' })
export class CarService {
  private storageKey = 'cars';
  private carsSubject = new BehaviorSubject<Car[]>(this.load());
  cars$ = this.carsSubject.asObservable();

  private load(): Car[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) as Car[] : [];
  }

  private save(cars: Car[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cars));
    this.carsSubject.next(cars);
  }

  getCars(): Car[] {
    return this.carsSubject.value;
  }

  addCar(car: Car): void {
    const cars = [...this.getCars()];
    car.id = Date.now();
    cars.push(car);
    this.save(cars);
  }

  updateCar(car: Car): void {
    const cars = this.getCars().map(c => c.id === car.id ? car : c);
    this.save(cars);
  }

  deleteCar(id: number): void {
    const cars = this.getCars().filter(c => c.id !== id);
    this.save(cars);
  }
}
