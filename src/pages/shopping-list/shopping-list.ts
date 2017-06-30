import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingList} from "../../services/shopping.list";
import {Ingredient} from "../../models/ingredient";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  constructor(private sl: ShoppingList) {}

  onSubmit(f: NgForm) {
    this.sl.add(f.value.ingredient, f.value.amount);
    f.reset();
  }

  getIngredientList(): Ingredient[] {
    return this.sl.get();
  }

  onCheckItem(ingredient: Ingredient) {
    this.sl.remove(ingredient.name, ingredient.amount);
  }

}
