import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {NewRecipePage} from "../new-recipe/new-recipe";
import {RecipesService} from "../../services/recipes";
import {ShoppingList} from "../../services/shopping.list";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: Recipe;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private recipesService: RecipesService,
    private sl: ShoppingList
  ) {}

  ngOnInit(): void {
    this.recipe = this.navParams.data
  }

  onEditRecipe() {
    this.navCtrl.push(NewRecipePage, { mode: 'edit', recipe: this.recipe });
  }

  onDeleteRecipe() {
    this.recipesService.remove(this.recipesService.get().indexOf(this.recipe));
    this.navCtrl.pop();
  }

  onAddIngredients() {
    this.sl.addItems(this.recipe.ingredients);
  }

}
