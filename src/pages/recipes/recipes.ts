import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {NewRecipePage} from "../new-recipe/new-recipe";
import {RecipesService} from "../../services/recipes";
import {Recipe} from "../../models/recipe";
import {RecipePage} from "../recipe/recipe";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(
    private navCtrl: NavController,
    private recipesService: RecipesService
  ){}

  onNewRecipe() {
    this.navCtrl.push(NewRecipePage, { mode: 'new' });
  }

  getRecipes():Recipe[] {
      return this.recipesService.get();
  }

  onLoadRecipe(i: number) {
      this.navCtrl.push(RecipePage, this.recipesService.get()[i]);
  }

}
