import {Component, OnInit, Input} from '@angular/core';
import {ListdishesService} from './listdishes.service';
import {ActivatedRoute} from '@angular/router';
import {Dish} from '../../models/dish.model';
import {Subscription} from 'rxjs';
import {DishesService} from '../../dishes/dishes.service';
import {AuthService} from '../../login-form/auth.service';

@Component({
  selector: 'app-listdishes',
  templateUrl: './listdishes.component.html',
  styleUrls: ['./listdishes.component.scss']
})
export class ListdishesComponent implements OnInit {

  dish: Dish[] = [];
  sub: Subscription;

  constructor(
    private listdishesService: ListdishesService,
    private router: ActivatedRoute,
    private dishService: DishesService,
    public authService: AuthService) {
  }

  @Input()
  prop !: number;

  ngOnInit() {
    this.getDishes();
  }

  getDishes(): void {
    this.listdishesService.getDishes()
      .subscribe(res => {
        this.dish = res;
      });
  }

  changeWhenIsNotAvailability(dish: Dish): void {

    if (dish.isAvailable) {
      dish.isAvailable = false;
    } else {
      dish.isAvailable = true;
    }

    console.log(dish.id);
    this.sub = this.dishService.updateDish(dish).subscribe();
  }

}
