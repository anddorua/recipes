import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor (
    private http: Http,
    private auth: AuthService
  ){}

  add(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  get(): Recipe[] {
    return [].concat(this.recipes);
  }

  update(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  remove(index: number) {
    this.recipes.splice(index, 1);
  }

  storeRecipes(token: string) {
    const userId = this.auth.getActiveUser().uid;
    return this.http
      .put(`https://ionic2-recipes.firebaseio.com/${userId}/recipes.json?auth=${token}`, this.recipes)
      .map((response: Response) => response.json());
  }

  fetchRecipes(token: string) {
    const userId = this.auth.getActiveUser().uid;
    return this.http
      .get(`https://ionic2-recipes.firebaseio.com/${userId}/recipes.json?auth=${token}`)
      .map((response: Response) => response.json())
      .do(list => this.recipes = list || []);
  }
}
