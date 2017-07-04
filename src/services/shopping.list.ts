import {Ingredient} from "../models/ingredient";
import {AuthService} from "./auth";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ShoppingList {
  private sl: Ingredient[] = [];

  constructor(
    private auth: AuthService,
    private http: Http
  ){}

  add(product: string, amount: number) {
    let index = this.sl.findIndex(item => item.name == product);
    if (index >= 0) {
      this.sl[index].amount += amount;
    } else {
      this.sl.push(new Ingredient(product, amount));
    }
  }

  addItems(items: Ingredient[]) {
    items.forEach(item => { this.add(item.name, item.amount); });
  }

  remove(product: string, amount: number) {
    let index = this.sl.findIndex(item => item.name == product);
    if (index >= 0) {
      this.sl[index].amount -= amount;
      if (this.sl[index].amount == 0) {
        this.sl.splice(index, 1);
      }
    }
  }

  get():Ingredient[] {
    return [].concat(this.sl);
  }

  storeList(token: string) {
    const userId = this.auth.getActiveUser().uid;
    return this.http
      .put(`https://ionic2-recipes.firebaseio.com/${userId}/shopping-list.json?auth=${token}`, this.sl)
      .map((response: Response) => response.json());
  }

  fetchList(token: string) {
    const userId = this.auth.getActiveUser().uid;
    return this.http
      .get(`https://ionic2-recipes.firebaseio.com/${userId}/shopping-list.json?auth=${token}`)
      .map((response: Response) => response.json())
      .do(list => this.sl = list || []);
  }
}
