import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {CanActivate, Router} from '@angular/router';
import {DishesService} from '../dishes/dishes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy, CanActivate {
  sub: Subscription;
  isLogin = false;

  constructor(
    private  http: HttpClient,
    private router: Router,
    public dishService: DishesService
  ) {
  }

  check(login: string, password: string) {
    let users: User[] = [];
    this.sub = this.http.get<User[]>('/api/users').pipe(
      map(x => x.filter(y => y.name === login && y.password === password))
    ).subscribe(res => {
      users = res;
      console.log(res);

      if (users.length !== 0) {
        this.isLogin = true;
        this.router.navigate(['admin']);
      } else {
        alert('Incorect name or pasword');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  canActivate(): boolean {
    if (!this.isLogin) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.isLogin = false;
    this.dishService.showView = true;
  }
}
