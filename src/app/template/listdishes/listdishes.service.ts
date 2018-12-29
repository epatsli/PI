import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Dish} from '../../models/dish.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListdishesService {

  constructor(readonly http: HttpClient) {
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>('/api/dishes');
  }

}
