import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";

export class RecipesService {
  private recipes: Recipe[] = [];

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
}
