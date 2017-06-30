import {Component, OnInit} from '@angular/core';
import {
  IonicPage, NavController, NavParams, ActionSheetController, AlertController,
  ToastController
} from 'ionic-angular';
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {Ingredient} from "../../models/ingredient";
import {RecipesService} from "../../services/recipes";
import {Recipe} from "../../models/recipe";


@IonicPage()
@Component({
  selector: 'page-new-recipe',
  templateUrl: 'new-recipe.html',
})
export class NewRecipePage implements OnInit {

  mode: string = 'new';
  index: number = -1;
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private asCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipesService: RecipesService
  ) {
  }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
    this.index = this.mode == 'edit' ? this.recipesService.get().indexOf(this.navParams.get('recipe')) : -1;
    this.initForm(this.mode == 'edit' ? this.navParams.get('recipe') : null);
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients: Ingredient[] = value.ingredients.map(item => new Ingredient(item, 1));
    if (this.mode == 'edit') {
      this.recipesService.update(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipesService.add(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.asCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            setTimeout(() => {
              this.createNewIngredientAlert().present();
            }, 0);
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            let len = fArray.length;
            for(let i = len - 1; i >= 0; i--) {
              fArray.removeAt(i);
            }
            if (len) {
              this.toastCtrl.create({
                message: 'All itens deleted!',
                duration: 1500,
                position: 'bottom'
              }).present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name == null || data.name.trim() == '') {
              this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1500,
                position: 'bottom'
              }).present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            this.toastCtrl.create({
              message: 'Item added!',
              duration: 1500,
              position: 'bottom'
            }).present();
          }
        }
      ],
    });
  }

  private initForm(recipe: Recipe|null) {
    this.recipeForm = new FormGroup({
      'title': new FormControl(recipe ? recipe.title : null, Validators.required),
      'description': new FormControl(recipe ? recipe.description : null, Validators.required),
      'difficulty': new FormControl(recipe ? recipe.difficulty : 'Medium', Validators.required),
      'ingredients': new FormArray(
        recipe
          ? recipe.ingredients.map(ingredient => new FormControl(ingredient.name, Validators.required))
          : [])
    });
  }
}
